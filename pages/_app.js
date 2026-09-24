import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ThemeProvider } from '../context/ThemeContext';

export default function App({ Component, pageProps }) {
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
