import { useEffect, useRef } from 'react';

export default function HeroSection({ data }) {
  const nameRef = useRef(null);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 100);
  }, []);

  const techItems = [
    { label: 'Next.js', color: '#ffffff' },
    { label: 'NestJS', color: '#e0234e' },
    { label: 'PostgreSQL', color: '#336791' },
    { label: 'Kong Gateway', color: '#00d4ff' },
    { label: 'Jenkins / CI', color: '#d33833' },
  ];

  return (
    <section id="hero" className="hero-section section">
      <div className="container position-relative">
        <div className="row align-items-center">

          {/* Avatar — mobile: top center, desktop: right column */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center order-lg-2 mb-5 mb-lg-0">
            {/* Orbit container — badges positioned around the circle */}
            <div style={{ position: 'relative', width: 380, height: 380 }}>

              {/* Dashed orbit ring */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px dashed var(--border)',
                zIndex: 1,
              }} />

              {/* Center avatar */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 200, height: 200,
                zIndex: 3,
              }}>
                {/* Spinning gradient ring */}
                <div style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  background: 'conic-gradient(var(--accent), var(--accent-2), var(--accent-3), var(--accent))',
                  animation: 'spinRing 6s linear infinite',
                  zIndex: 0,
                }} />
                {/* Ring mask */}
                <div style={{
                  position: 'absolute',
                  inset: 2,
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  zIndex: 1,
                }} />
                {/* Photo */}
                <img
                  src="/avatar.jpeg"
                  alt="Alyan Quddoos"
                  style={{
                    position: 'absolute',
                    inset: 8,
                    width: 'calc(100% - 16px)',
                    height: 'calc(100% - 16px)',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    zIndex: 2,
                    boxShadow: '0 0 40px var(--glow-strong)',
                  }}
                />
                {/* Glow */}
                <div style={{
                  position: 'absolute',
                  inset: 10,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--glow-strong) 0%, transparent 70%)',
                  zIndex: 0,
                  filter: 'blur(18px)',
                }} />
                {/* Available badge */}
                <div style={{
                  position: 'absolute',
                  bottom: -10, left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 4,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 50,
                  padding: '4px 12px',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.6rem',
                  color: 'var(--accent-3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-3)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                  Available
                </div>
              </div>

              {/* Orbiting tech badges — placed at clock positions */}
              {techItems.map((t, i) => {
                // Angles: top, top-right, bottom-right, bottom-left, top-left
                const angles = [-90, -18, 54, 126, 198];
                const angle = (angles[i] * Math.PI) / 180;
                const radius = 170;
                const cx = 190, cy = 190;
                const x = cx + radius * Math.cos(angle);
                const y = cy + radius * Math.sin(angle);
                return (
                  <div
                    key={t.label}
                    style={{
                      position: 'absolute',
                      left: x,
                      top: y,
                      transform: 'translate(-50%, -50%)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '8px 14px',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      zIndex: 5,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      animation: `floatBadge ${3 + i * 0.4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                      backdropFilter: 'blur(8px)',
                      transition: 'border-color 0.3s, color 0.3s',
                    }}
                  >
                    <span style={{
                      width: 8, height: 8,
                      borderRadius: '50%',
                      background: t.color,
                      display: 'inline-block',
                      boxShadow: `0 0 6px ${t.color}`,
                      flexShrink: 0,
                    }} />
                    {t.label}
                  </div>
                );
              })}

            </div>

            <style>{`
              @keyframes spinRing {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>

          <div className="col-lg-6 order-lg-1">
            <div ref={nameRef}>
              <div className="hero-tag">
                <span className="hero-tag-dot" />
                <span className="mono">Available for opportunities</span>
              </div>

              <h1 className="hero-name">{data.name}</h1>

              <p className="hero-title mono">{data.title}</p>

              <p className="hero-subtitle">{data.subtitle}</p>

              <div className="d-flex flex-wrap gap-2">
                <a href="#projects" className="hero-cta">
                  View Projects <span>→</span>
                </a>
                <a href="#contact" className="hero-cta hero-cta-outline">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'floatBadge 2s ease-in-out infinite',
        }}
      >
        <span style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(180deg, var(--accent), transparent)',
          }}
        />
      </div>
    </section>
  );
}
