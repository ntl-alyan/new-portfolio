import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Bootstrap JS
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  // Admin page bypasses theme wrapper
  if (Component.adminPage) {
    return <Component {...pageProps} />;
  }

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
