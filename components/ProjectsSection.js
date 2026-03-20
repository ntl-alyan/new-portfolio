import { useEffect, useRef } from 'react';

export default function ProjectsSection({ data }) {
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
    <section id="projects" className="section" ref={ref} style={{ background: 'rgba(0,0,0,0.08)' }}>
      <div className="container">
        <div className="reveal">
          {/* <span className="section-label">// projects</span> */}
          <h2 className="section-title">Things I've<br />Built.</h2>
          <div className="section-divider" />
        </div>

        <div className="row g-4">
          {data.map((project, i) => (
            <div className="col-lg-4 col-md-6" key={project.id}>
              <div
                className={`project-card reveal reveal-delay-${i + 1}`}
                style={{ '--project-color': project.color }}
              >
                <div className="project-number mono">0{i + 1}</div>

                <div
                  style={{
                    width: 36,
                    height: 3,
                    background: project.color,
                    borderRadius: 2,
                    marginBottom: 20,
                    boxShadow: `0 0 10px ${project.color}66`,
                  }}
                />

                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>

                <div style={{ marginTop: 'auto' }}>
                  {project.tech.map(t => (
                    <span key={t} className="project-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
