import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThreeBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const animRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    let THREE;
    let mounted = true;

    async function init() {
      THREE = await import('three');

      const canvas = canvasRef.current;
      if (!canvas || !mounted) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;

      // Stars / particles
      const starGeo = new THREE.BufferGeometry();
      const starCount = 1800;
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        sizes[i] = Math.random() * 2 + 0.5;
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const starMat = new THREE.PointsMaterial({
        color: 0xFFF6C0,
        size: 0.25,
        transparent: true,
        opacity: theme === 'night' ? 0.8 : 0.15,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // Floating geometric shapes
      const shapes = [];
      const shapeGeos = [
        new THREE.OctahedronGeometry(1.5, 0),
        new THREE.TetrahedronGeometry(1.2, 0),
        new THREE.IcosahedronGeometry(1.0, 0),
        new THREE.OctahedronGeometry(0.8, 0),
        new THREE.TetrahedronGeometry(1.8, 0),
      ];

      shapeGeos.forEach((geo, i) => {
        const mat = new THREE.MeshBasicMaterial({
          color: [0x2F6B3F, 0x7FB77E, 0xF7C85C, 0xFFF6C0, 0x2F6B3F][i],
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20 - 5
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        scene.add(mesh);
        shapes.push({
          mesh,
          rotSpeed: { x: (Math.random() - 0.5) * 0.008, y: (Math.random() - 0.5) * 0.01 },
          floatSpeed: Math.random() * 0.001 + 0.0005,
          floatOffset: Math.random() * Math.PI * 2,
        });
      });

      // Grid plane
      const gridHelper = new THREE.GridHelper(100, 30, 0x2F6B3F, 0x122a1a);
      gridHelper.position.y = -15;
      gridHelper.material.opacity = 0.08;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      sceneRef.current = { renderer, scene, camera, stars, starMat, shapes };

      let mouse = { x: 0, y: 0 };
      const onMouseMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        if (!mounted) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      let frame = 0;
      const animate = () => {
        if (!mounted) return;
        animRef.current = requestAnimationFrame(animate);
        frame += 0.01;

        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;

        shapes.forEach((s) => {
          s.mesh.rotation.x += s.rotSpeed.x;
          s.mesh.rotation.y += s.rotSpeed.y;
          s.mesh.position.y += Math.sin(frame * s.floatSpeed * 60 + s.floatOffset) * 0.01;
        });

        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 1 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      sceneRef.current.cleanup = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    }

    init();

    return () => {
      mounted = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (sceneRef.current.cleanup) sceneRef.current.cleanup();
      if (sceneRef.current.renderer) sceneRef.current.renderer.dispose();
    };
  }, []);

  // Update star opacity on theme change
  useEffect(() => {
    if (sceneRef.current.starMat) {
      sceneRef.current.starMat.opacity = theme === 'night' ? 0.8 : 0.1;
    }
    if (sceneRef.current.shapes) {
      sceneRef.current.shapes.forEach(s => {
        s.mesh.material.opacity = theme === 'night' ? 0.15 : 0.06;
      });
    }
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
