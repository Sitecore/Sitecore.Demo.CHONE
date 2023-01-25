import '../styles/main.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header/Header';
import { ThemeSwitcherContextProvider } from '../store/themeSwitcherContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeSwitcherContextProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeSwitcherContextProvider>
  );
}
