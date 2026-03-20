import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`portfolio-nav navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a className="nav-brand navbar-brand" href="#">
          Alyan Quddoos<span style={{ color: 'var(--text-muted)' }}>.</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navCollapse"
          aria-controls="navCollapse"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navCollapse">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            {navLinks.map((l) => (
              <li className="nav-item" key={l.label}>
                <a href={l.href} className="nav-link nav-link-item">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-2">
              <button className="theme-toggle" onClick={toggleTheme}>
                <span>{theme === 'night' ? '☀️' : '🌙'}</span>
                <span>{theme === 'night' ? 'Day' : 'Night'}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
