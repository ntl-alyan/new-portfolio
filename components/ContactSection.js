import { useState } from 'react';
import { Reveal, SectionHeading, Icon } from './ui';

const ACHIEVEMENT_ICONS = ['trophy', 'cert', 'code', 'award'];

function splitAchievement(text) {
  const i = text.indexOf(':');
  return i > 0 ? [text.slice(0, i), text.slice(i + 1).trim()] : [text, ''];
}

export default function ContactSection({ achievementsData, heroData }) {
  const [copied, setCopied] = useState(false);
  const phoneDigits = heroData.phone.replace(/[^0-9]/g, '');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(heroData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const links = [
    { icon: 'mail', label: 'Email', value: heroData.email, href: `mailto:${heroData.email}` },
    { icon: 'phone', label: 'WhatsApp', value: heroData.phone, href: `https://wa.me/${phoneDigits}` },
    heroData.linkedin && { icon: 'linkedin', label: 'LinkedIn', value: heroData.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: heroData.linkedin },
    heroData.github && { icon: 'github', label: 'GitHub', value: heroData.github.replace(/^https?:\/\/(www\.)?/, ''), href: heroData.github },
  ].filter(Boolean);

  return (
    <>
      <section id="recognition" className="section">
        <div className="wrap">
          <SectionHeading index="05" eyebrow="Recognition" title="A few things I'm proud of." />
          <div className="awards-grid">
            {achievementsData.map((a, i) => {
              const [title, detail] = splitAchievement(a);
              return (
                <Reveal key={i} delay={i * 0.06} className="award">
                  <span className="award-icon"><Icon name={ACHIEVEMENT_ICONS[i] || 'award'} size={20} /></span>
                  <div>
                    <div className="award-title">{title}</div>
                    {detail && <div className="award-detail">{detail}</div>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="wrap">
          <Reveal className="contact-panel">
            <div className="contact-bg" aria-hidden="true" />
            <div className="contact-copy">
              <div className="eyebrow">
                <span className="eyebrow-index">06</span>
                <span className="eyebrow-line" />
                <span>Contact</span>
              </div>
              <h2 className="contact-title">Want to work together?</h2>
              <p className="contact-lead">
                Whether you&apos;re hiring, building something interesting, or just want to talk shop,
                I&apos;d be glad to hear from you. Email is the best way to reach me.
              </p>
              <div className="contact-actions">
                <a href={`mailto:${heroData.email}`} className="cta cta-primary">
                  Email me <Icon name="arrow" size={16} />
                </a>
                <button type="button" className="cta cta-ghost" onClick={copyEmail}>
                  <Icon name={copied ? 'check' : 'copy'} size={16} />
                  {copied ? 'Copied' : 'Copy email'}
                </button>
              </div>
            </div>

            <ul className="contact-links">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-link">
                    <span className="contact-link-icon"><Icon name={l.icon} /></span>
                    <span className="contact-link-text">
                      <span className="contact-link-label">{l.label}</span>
                      <span className="contact-link-value">{l.value}</span>
                    </span>
                    <Icon name="arrowUpRight" size={16} className="contact-link-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
