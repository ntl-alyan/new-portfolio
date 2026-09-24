import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Icon } from './ui';

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Work', id: 'projects' },
  { label: 'Stack', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ name }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const initials = name.split(' ').map((w) => w[0]).join('');

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className={`tb ${scrolled ? 'tb--scrolled' : ''}`}>
        <div className="tb-inner">
          <a href="#top" className="tb-brand" aria-label="Back to top">
            <span className="tb-mark">{initials}</span>
            <span className="tb-name">{name}</span>
          </a>

          <nav className="tb-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={`tb-link ${active === l.id ? 'is-active' : ''}`}>
                {active === l.id && <motion.span layoutId="tb-pill" className="tb-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="tb-actions">
            <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'night' ? 'light' : 'dark'} theme`}>
              <Icon name={theme === 'night' ? 'sun' : 'moon'} size={17} />
            </button>
            <a href="#contact" className="cta cta-primary cta-sm tb-cta">Get in touch</a>
            <button className="icon-btn tb-burger" onClick={() => setOpen(true)} aria-label="Open menu">
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button className="icon-btn mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <Icon name="close" size={20} />
        </button>
        <nav>
          {LINKS.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${0.05 + i * 0.04}s` : '0s' }}>
              <span className="mono">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
