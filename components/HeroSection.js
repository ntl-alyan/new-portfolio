import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Icon } from './ui';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-scene hero-scene--loading" />,
});

const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection({ data, stats = [] }) {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const words = data.name.split(' ');

  const fade = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.a href="#experience" className="status-chip" {...fade(0.05)}>
            <span className="status-dot" />
            <span>{data.title.split(/[·,]/)[0].trim()} at {data.company}</span>
            <Icon name="arrowUpRight" size={14} />
          </motion.a>

          <h1 className="hero-name" aria-label={data.name}>
            {words.map((w, i) => (
              <span className="word-mask" key={w + i}>
                <motion.span
                  className="word"
                  initial={{ y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-role" {...fade(0.4)}>
            <span className="gradient-text">{data.title}</span>
          </motion.p>

          <motion.p className="hero-sub" {...fade(0.5)}>
            {data.subtitle}
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.6)}>
            <a href="#projects" className="cta cta-primary">
              See my work <Icon name="arrow" size={16} />
            </a>
            <a href="#contact" className="cta cta-ghost">Get in touch</a>
          </motion.div>

          {stats.length > 0 && (
            <motion.dl className="hero-stats" {...fade(0.72)}>
              {stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
        >
          <div className="hero-glow" />
          <HeroScene theme={theme} />
          <div className="float-tag float-tag--a"><span className="dot" />Kong API Gateway</div>
          <div className="float-tag float-tag--b"><span className="dot dot--alt" />Next.js · NestJS</div>
          <div className="float-tag float-tag--c"><span className="dot" />CI/CD · Jenkins</div>
        </motion.div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to about">
        <span className="scroll-cue-track"><span className="scroll-cue-dot" /></span>
      </a>
    </section>
  );
}
