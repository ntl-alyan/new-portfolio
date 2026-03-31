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
    { label: 'Next.js', color: '#FFF6C0' },
    { label: 'NestJS', color: '#F7C85C' },
    { label: 'PostgreSQL', color: '#7FB77E' },
    { label: 'Kong Gateway', color: '#2F6B3F' },
    { label: 'Jenkins / CI', color: '#F7C85C' },
  ];

  const angles = [-90, -18, 54, 126, 198];

  return (
    <section id="hero" className="hero-section section">
      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        :root {
          --avatar-size: 220px;
          --orbit-size: 340px;
        }
        @media (min-width: 992px) {
          :root {
            --avatar-size: 280px;
            --orbit-size: 460px;
          }
        }
        .orbit-wrapper {
          position: relative;
          width: var(--orbit-size);
          height: var(--orbit-size);
          flex-shrink: 0;
        }
        .avatar-container {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: var(--avatar-size);
          height: var(--avatar-size);
          z-index: 3;
        }
        .orbit-badge { display: none !important; }
        .tech-pill-row { display: flex !important; }
        @media (min-width: 992px) {
          .orbit-badge  { display: flex !important; }
          .tech-pill-row { display: none !important; }
        }
        .hero-btn-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 576px) {
          .hero-btn-group {
            flex-direction: row;
            /* width remains 100% below 992px to center along row */
          }
          .hero-btn-group a {
            width: 180px;
          }
        }
        @media (min-width: 992px) {
          .hero-btn-group {
            width: auto;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .hero-btn-group a {
            width: 180px;
          }
        }
        /* Mobile spacing/scrolling fixes */
        @media (max-width: 991px) {
          .hero-section {
            padding-bottom: 120px;
            padding-top: 100px;
          }
          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media (max-height: 750px) {
          .scroll-indicator {
            display: none !important;
          }
          .hero-section {
            padding-bottom: 40px;
          }
        }
      `}</style>

      <div className="container position-relative">
        <div className="row align-items-center gy-5">

          {/* Avatar column */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center order-lg-2">
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

              <div className="orbit-wrapper">
                {/* Dashed orbit ring desktop */}
                <div className="d-none d-lg-block" style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: '1px dashed var(--border)',
                  zIndex: 1,
                }} />

                {/* Center avatar */}
                <div className="avatar-container">
                  <div style={{
                    position: 'absolute', inset: -8, borderRadius: '50%',
                    background: 'conic-gradient(var(--accent), var(--accent-2), var(--accent), var(--accent-2))',
                    animation: 'spinRing 6s linear infinite', zIndex: 0,
                  }} />
                  <div style={{
                    position: 'absolute', inset: 3, borderRadius: '50%',
                    background: 'var(--bg-primary)', zIndex: 1,
                  }} />
                  <img
                    src="/avatar.png"
                    alt="Alyan Quddoos"
                    style={{
                      position: 'absolute', inset: 10,
                      width: 'calc(100% - 20px)', height: 'calc(100% - 20px)',
                      borderRadius: '50%', objectFit: 'cover',
                      objectPosition: 'center top', zIndex: 2,
                      boxShadow: '0 0 50px var(--glow-strong)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 10, borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                    zIndex: 0, filter: 'blur(25px)', opacity: 0.4
                  }} />
                  {/* Available badge */}
                  {/* <div style={{
                    position: 'absolute', bottom: -14, left: '50%',
                    transform: 'translateX(-50%)', zIndex: 4,
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 50, padding: '4px 12px',
                    fontFamily: 'Fira Code, monospace', fontSize: '0.6rem',
                    color: 'var(--accent)', display: 'flex', alignItems: 'center',
                    gap: 5, whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: 'var(--accent)', display: 'inline-block',
                      animation: 'pulse 2s infinite',
                    }} />
                    Available
                  </div> */}
                </div>

                {/* Orbiting badges — desktop only */}
                {techItems.map((t, i) => {
                  const rad = (angles[i] * Math.PI) / 180;
                  // Desktop only, orbit is 460px. center is 230,230. r ~ 195
                  const cx = 230, cy = 230, r = 195;
                  return (
                    <div
                      key={t.label}
                      className="orbit-badge"
                      style={{
                        position: 'absolute',
                        left: cx + r * Math.cos(rad),
                        top: cy + r * Math.sin(rad),
                        transform: 'translate(-50%, -50%)',
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        borderRadius: 8, padding: '7px 13px',
                        fontFamily: 'Fira Code, monospace', fontSize: '0.7rem',
                        color: 'var(--text-secondary)',
                        alignItems: 'center', gap: 7, zIndex: 5,
                        whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                        animation: `floatBadge ${3 + i * 0.4}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`, backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: t.color, display: 'inline-block',
                        boxShadow: `0 0 6px ${t.color}`, flexShrink: 0,
                      }} />
                      {t.label}
                    </div>
                  );
                })}
              </div>

              {/* Mobile pill row — sits below image, fully contained */}
              <div className="tech-pill-row" style={{
                flexWrap: 'wrap', gap: 6,
                justifyContent: 'center', padding: '8px 0 0',
              }}>
                {techItems.map(t => (
                  <span key={t.label} style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 50, padding: '5px 13px',
                    fontFamily: 'Fira Code, monospace', fontSize: '0.65rem',
                    color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: t.color, flexShrink: 0,
                      boxShadow: `0 0 5px ${t.color}`,
                    }} />
                    {t.label}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* Text column */}
          <div className="col-lg-6 order-lg-1 text-center text-lg-start">
            <div ref={nameRef}>
              <div className="hero-tag">
                <span className="hero-tag-dot" />
                <span className="mono">Available for opportunities</span>
              </div>
              <h1 className="hero-name">{data.name}</h1>
              <p className="hero-title mono">{data.title}</p>
              <p className="hero-subtitle">{data.subtitle}</p>

              <div className="hero-btn-group">
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
      <div className="scroll-indicator" style={{
        position: 'absolute', bottom: 40, left: '45%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'floatBadge 2s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'Fira Code', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
          SCROLL
        </span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg, var(--accent), transparent)' }} />
      </div>
    </section>
  );
}
