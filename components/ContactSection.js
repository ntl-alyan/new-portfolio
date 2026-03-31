import { useEffect, useRef } from 'react';

const ACHIEVEMENT_ICONS = ['🏆', '📜', '📜', '🥉'];

export default function ContactSection({ achievementsData, heroData }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <div className="row g-5">
          {/* Achievements */}
          <div className="col-lg-6">
            <div className="reveal">
              {/* <span className="section-label">// achievements</span> */}
              <h2 className="section-title">Recognition.</h2>
              <div className="section-divider" />
            </div>
            <div>
              {achievementsData.map((a, i) => (
                <div className={`achievement-item reveal reveal-delay-${i + 1}`} key={i}>
                  <span className="achievement-icon">{ACHIEVEMENT_ICONS[i] || '⭐'}</span>
                  <span className="achievement-text">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-6">
            <div className="reveal reveal-delay-1">
              {/* <span className="section-label">// contact</span> */}
              <h2 className="section-title">Let's Talk.</h2>
              <div className="section-divider" />
            </div>

            <p className="reveal reveal-delay-2" style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 28, fontSize: '0.95rem' }}>
              Have a project in mind, or just want to say hello? I'm always open to discussing new opportunities.
            </p>

            <div className="reveal reveal-delay-2">
              <a href={`mailto:${heroData.email}`} className="contact-link">
                <span className="contact-icon">✉️</span>
                <span>{heroData.email}</span>
              </a>
              <a href={`https://wa.me/${heroData.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="contact-link">
                <span className="contact-icon">💬</span>
                <span>WhatsApp — {heroData.phone}</span>
              </a>
              <a href="https://linkedin.com/in/alyanquddoos111" target="_blank" rel="noreferrer" className="contact-link">
                <span className="contact-icon">🔗</span>
                <span>LinkedIn Profile</span>
              </a>
              <a href="https://github.com/ntl-alyan" target="_blank" rel="noreferrer" className="contact-link">
                <span className="contact-icon">🐙</span>
                <span>GitHub Profile</span>
              </a>
            </div>

            {/* CTA card */}
            <div className="reveal reveal-delay-3" style={{ marginTop: 24 }}>
              <div
                className="portfolio-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(47,107,63,0.4) 0%, rgba(127,183,126,0.2) 100%)',
                  borderColor: 'var(--border-hover)',
                  textAlign: 'center',
                  padding: '36px',
                }}
              >
                <div style={{ fontFamily: 'Fira Code', fontSize: '0.7rem', color: 'var(--text-muted-2)', letterSpacing: '0.2em', marginBottom: 12 }}>
                  CURRENTLY OPEN TO
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-muted-2)', marginBottom: 8 }}>
                  Full-Time Roles & Freelance
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted-2)' }}>
                  Next.js · NestJS · Full Stack Development
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
