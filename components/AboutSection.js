import { useEffect, useRef } from 'react';

export default function AboutSection({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '3', label: 'Products Shipped' },
    { value: '∞', label: 'Lines of Code' },
  ];

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="reveal">
              {/* <span className="section-label">// about me</span> */}
              <h2 className="section-title">Building Things<br />That Scale.</h2>
              <div className="section-divider" />
            </div>
            <div className="reveal reveal-delay-1">
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.97rem', marginBottom: 24 }}>
                {data.bio}
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.97rem' }}>
                Studied <strong style={{ color: 'var(--accent)' }}>{data.degree}</strong> at{' '}
                <strong style={{ color: 'var(--accent)' }}>{data.university}</strong>,
                where I built a foundation in software engineering and systems design.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              {stats.map((s, i) => (
                <div className="col-4" key={s.label}>
                  <div className={`portfolio-card text-center reveal reveal-delay-${i + 1}`}>
                    <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'Space Mono', lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12">
                <div className="portfolio-card reveal reveal-delay-2" style={{ padding: '28px 32px' }}>
                  <div style={{ fontFamily: 'Space Mono', fontSize: '0.7rem', color: 'var(--accent-2)', letterSpacing: '0.15em', marginBottom: 12 }}>
                    CURRENTLY WORKING AT
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                    Nayatel Pvt. Ltd.
                  </div>
                  <div style={{ fontFamily: 'Space Mono', fontSize: '0.78rem', color: 'var(--accent)' }}>
                    Software Engineer · June 2023 – Present
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 14,
                      padding: '4px 12px',
                      background: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.25)',
                      borderRadius: 50,
                      fontSize: '0.7rem',
                      color: 'var(--accent-3)',
                      fontFamily: 'Space Mono',
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-3)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
