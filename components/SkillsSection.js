import { Reveal, SectionHeading } from './ui';

const GROUPS = [
  { key: 'frameworks', label: 'Frameworks & Data', note: 'Building the apps' },
  { key: 'languages', label: 'Languages', note: 'Day to day' },
  { key: 'tools', label: 'Platform & DevOps', note: 'Shipping and running it' },
  { key: 'leadership', label: 'Leadership', note: 'Working with people' },
];

export function TechMarquee({ skills }) {
  const items = [...(skills.frameworks || []), ...(skills.tools || []), ...(skills.languages || [])];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}<span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection({ data }) {
  const groups = GROUPS.filter((g) => data[g.key]?.length);
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHeading index="04" eyebrow="Stack" title="What I work with." />

        <div className="skills-grid">
          {groups.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.06} className="skill-group">
              <div className="skill-head">
                <span className="skill-label">{g.label}</span>
                <span className="skill-note">{g.note}</span>
              </div>
              <ul className="skill-chips">
                {data[g.key].map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
