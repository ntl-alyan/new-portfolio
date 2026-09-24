import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// The initial theme is applied to <html> by an inline script in _document.js
// (before paint), so here we only read it back and keep it in sync.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('night');

  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem('portfolio-theme'); } catch {}
    if (saved === 'day' || saved === 'night') setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'night' ? 'day' : 'night';
      try { localStorage.setItem('portfolio-theme', next); } catch {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
