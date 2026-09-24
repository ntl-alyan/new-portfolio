import { Reveal, SectionHeading, TiltCard } from './ui';

export default function ProjectsSection({ data }) {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHeading
          index="03"
          eyebrow="Work"
          title="Things I've built."
          lead="The three systems I spend most of my time on. People at Nayatel and our customers use them every day."
        />

        <div className="projects-grid">
          {data.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="project-cell">
              <TiltCard className="project" style={{ '--pc': p.color }}>
                <div className="project-top">
                  <span className="project-index mono">0{i + 1}</span>
                  {p.category && <span className="project-cat">{p.category}</span>}
                </div>
                <div className="project-orb" aria-hidden="true" />
                <h3 className="project-title">{p.name}</h3>
                <p className="project-desc">{p.description}</p>
                <ul className="project-tags">
                  {p.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
