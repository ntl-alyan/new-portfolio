import { Reveal, SectionHeading } from './ui';

export default function ExperienceSection({ data }) {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Professional experience."
          lead="Over three years at Nayatel, progressing from Software Engineer to Assistant Manager through fast-track promotions."
        />

        <div className="xp-list">
          {data.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.05} className="xp-card">
              <div className="xp-side">
                <div className="xp-period mono">{exp.period}</div>
                <div className="xp-company">{exp.company}</div>
                {exp.location && <div className="xp-location">{exp.location}</div>}
              </div>

              <div className="xp-main">
                <h3 className="xp-role">{exp.role}</h3>

                {exp.progression?.length > 1 && (
                  <ol className="xp-track" aria-label="Role progression">
                    {exp.progression.map((r, j) => (
                      <li key={r} className={j === exp.progression.length - 1 ? 'is-current' : ''}>
                        <span className="xp-track-dot" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ol>
                )}

                <ul className="xp-points">
                  {exp.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
