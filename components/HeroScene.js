import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 2;

const PALETTES = {
  night: { dots: '#9aa4b8', accent: '#5eead4', accent2: '#a5b4fc', core: '#0b0f17', ring: '#5eead4', additive: true },
  day: { dots: '#64748b', accent: '#0d9488', accent2: '#4f46e5', core: '#ffffff', ring: '#0d9488', additive: false },
};

// Evenly distributed points on a sphere (Fibonacci lattice)
function fibonacciSphere(count, radius) {
  const pts = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts[i * 3] = Math.cos(theta) * r * radius;
    pts[i * 3 + 1] = y * radius;
    pts[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return pts;
}

function randomOnSphere(radius, rand) {
  const u = rand();
  const v = rand();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Small deterministic PRNG so the arcs are identical on every render
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Arc({ curve, color, speed, offset }) {
  const packet = useRef();
  const trail = useRef();
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)),
    [curve]
  );

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * speed + offset) % 1;
    const p = curve.getPoint(t);
    packet.current.position.copy(p);
    const fade = Math.sin(t * Math.PI);
    packet.current.scale.setScalar(0.6 + fade * 0.6);
    trail.current.material.opacity = 0.12 + fade * 0.35;
  });

  return (
    <group>
      <line ref={trail} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} depthWrite={false} />
      </line>
      <mesh ref={packet}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Node({ position, color }) {
  const ref = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 2 + phase) * 0.35;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} depthWrite={false} />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius, tilt, speed, color, satellites = 1 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.004, 8, 200]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} />
        </mesh>
        {Array.from({ length: satellites }).map((_, i) => {
          const a = (i / satellites) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Fresnel rim light so the sphere edge glows instead of reading as a flat disc
function Atmosphere({ color, additive }) {
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color(color) } }), []);
  useEffect(() => { uniforms.uColor.value.set(color); }, [color, uniforms]);
  return (
    <mesh scale={1.06}>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`}
        fragmentShader={`
          uniform vec3 uColor;
          varying vec3 vNormal;
          void main() {
            float i = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            gl_FragColor = vec4(uColor, i * 0.55);
          }`}
      />
    </mesh>
  );
}

function Globe({ palette, reduced }) {
  const group = useRef();
  const dots = useMemo(() => fibonacciSphere(1600, RADIUS), []);

  const { arcs, nodes } = useMemo(() => {
    const rand = mulberry32(7);
    const hubs = Array.from({ length: 9 }, () => randomOnSphere(RADIUS, rand));
    const arcs = [];
    for (let i = 0; i < hubs.length; i++) {
      const a = hubs[i];
      const b = hubs[(i + 1 + Math.floor(rand() * 3)) % hubs.length];
      const dist = a.distanceTo(b);
      const mid = a.clone().add(b).normalize().multiplyScalar(RADIUS + dist * 0.45);
      arcs.push({
        curve: new THREE.QuadraticBezierCurve3(a, mid, b),
        speed: 0.12 + rand() * 0.12,
        offset: rand(),
        alt: i % 3 === 0,
      });
    }
    return { arcs, nodes: hubs };
  }, []);

  useFrame(({ pointer }, delta) => {
    const g = group.current;
    g.rotation.y += delta * (reduced ? 0.02 : 0.08);
    // Ease the tilt toward the cursor for a subtle parallax
    g.rotation.x += (pointer.y * 0.25 - g.rotation.x) * 0.04;
    g.rotation.z += (-pointer.x * 0.12 - g.rotation.z) * 0.04;
  });

  return (
    <group ref={group} rotation={[0.3, 0, 0]}>
      {/* Solid core hides the dots on the far side, giving the sphere depth */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 64, 64]} />
        <meshBasicMaterial color={palette.core} transparent opacity={0.92} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dots.length / 3} array={dots} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={palette.dots} size={0.022} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
      </points>

      <Atmosphere color={palette.accent} additive={palette.additive} />

      {nodes.map((p, i) => (
        <Node key={i} position={p} color={i % 3 === 0 ? palette.accent2 : palette.accent} />
      ))}
      {arcs.map((a, i) => (
        <Arc key={i} curve={a.curve} speed={reduced ? a.speed * 0.3 : a.speed} offset={a.offset} color={a.alt ? palette.accent2 : palette.accent} />
      ))}
    </group>
  );
}

export default function HeroScene({ theme = 'night' }) {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const palette = PALETTES[theme] || PALETTES.night;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="hero-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
      >
        <Globe palette={palette} reduced={reduced} />
        <OrbitRing radius={2.55} tilt={[1.2, 0.2, 0]} speed={0.25} color={palette.accent} satellites={2} />
        <OrbitRing radius={2.85} tilt={[1.9, -0.5, 0.3]} speed={-0.18} color={palette.accent2} satellites={1} />
      </Canvas>
    </div>
  );
}
