import { useEffect, useRef } from 'react';

export default function ExperienceSection({ data }) {
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
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="reveal" style={{ position: 'sticky', top: 120 }}>
              {/* <span className="section-label">// experience</span> */}
              <h2 className="section-title">Where I've<br />Worked.</h2>
              <div className="section-divider" />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: 'Space Mono' }}>
                Building production systems that handle real users, real data, and real scale.
              </p>
            </div>
          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">
            <div className="timeline">
              {data.map((exp, i) => (
                <div className={`timeline-item reveal reveal-delay-${i + 1}`} key={exp.id}>
                  <div className="timeline-dot" />
                  <div className="timeline-company">{exp.company}</div>
                  <div className="timeline-role">{exp.role}</div>
                  <div className="timeline-period mono">{exp.period}</div>
                  <ul className="timeline-points">
                    {exp.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
