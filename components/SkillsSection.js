import { useEffect, useRef } from 'react';

export default function SkillsSection({ data }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const categories = [
    { key: 'languages', label: 'Languages & Markups', color: 'var(--accent)' },
    { key: 'frameworks', label: 'Frameworks & Databases', color: 'var(--accent)' },
    { key: 'tools', label: 'Tools & DevOps', color: 'var(--accent)' },
  ];

  return (
    <section id="skills" className="section" ref={ref} style={{ background: 'rgba(0,0,0,0.1)' }}>
      <div className="container">
        <div className="reveal">
          {/* <span className="section-label">// skills</span> */}
          <h2 className="section-title">Tech Stack.</h2>
          <div className="section-divider" />
        </div>

        <div className="row g-4">
          {categories.map((cat, idx) => (
            <div className="col-lg-4" key={cat.key}>
              <div className={`portfolio-card reveal reveal-delay-${idx + 1}`} style={{ height: '100%' }}>
                <div className="skill-category-label" style={{ color: cat.color }}>
                  {cat.label}
                </div>
                <div>
                  {(data[cat.key] || []).map(skill => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual bar */}
        <div className="reveal reveal-delay-2" style={{ marginTop: 60 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', opacity: 0.25 }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: `${Math.random() * 40 + 10}px`,
                  background: `hsl(${90 + i * 2}, 50%, ${40 + (i % 5) * 8}%)`,
                  borderRadius: 2,
                  animation: `pulse ${1 + Math.random()}s ease-in-out infinite`,
                  animationDelay: `${Math.random()}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
