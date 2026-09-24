import { Reveal, SectionHeading, TiltCard, Icon } from './ui';

const PRINCIPLES = [
  ['Security first', 'Signed requests, strict validation and gateway-level authentication across every service.'],
  ['Reliable delivery', 'Automated CI/CD with Jenkins and Ansible for consistent, low-risk releases.'],
  ['Engineering standards', 'Reusable components, clear conventions and thorough code reviews.'],
];

export default function AboutSection({ data, hero, experience }) {
  const current = experience?.[0];

  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={<>Building reliable software.<br /><span className="muted-title">Leading capable teams.</span></>}
        />

        <div className="about-grid">
          <Reveal className="about-portrait-col">
            <TiltCard className="portrait-card" max={6}>
              <div className="portrait-frame">
                <img src="/avatar.png" alt={hero.name} className="portrait-img" />
              </div>
              <div className="portrait-meta">
                <div>
                  <div className="portrait-name">{hero.name}</div>
                  <div className="portrait-role">{current?.role || hero.title}</div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="about-body">
            <Reveal delay={0.05}>
              <p className="about-lead">{data.bio}</p>
            </Reveal>

            <div className="about-facts">
              {current && (
                <Reveal delay={0.1} className="fact">
                  <span className="fact-icon"><Icon name="code" /></span>
                  <div>
                    <div className="fact-label">Current role</div>
                    <div className="fact-value">{current.role} · {current.company}</div>
                  </div>
                </Reveal>
              )}
              <Reveal delay={0.15} className="fact">
                <span className="fact-icon"><Icon name="grad" /></span>
                <div>
                  <div className="fact-label">Education</div>
                  <div className="fact-value">{data.degree} · {data.university}</div>
                </div>
              </Reveal>
              {hero.location && (
                <Reveal delay={0.2} className="fact">
                  <span className="fact-icon"><Icon name="pin" /></span>
                  <div>
                    <div className="fact-label">Location</div>
                    <div className="fact-value">{hero.location}</div>
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.25} className="principles">
              {PRINCIPLES.map(([t, d]) => (
                <div className="principle" key={t}>
                  <div className="principle-title">{t}</div>
                  <div className="principle-desc">{d}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
