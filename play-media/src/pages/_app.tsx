import '../styles/main.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header/Header';
import { ThemeSwitcherContextProvider } from '../store/themeSwitcherContext';
import { CdpScripts } from '../services/CdpService';
import { TravelSidebar } from '../components/sidebar/TravelSidebar';
import Layout from "../components/layout/Layout";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* CDP integration. It is important this script is rendered before the <Component> so the CDP calls made on the first page load are successful. */}
          {CdpScripts}
      {/* END CDP integration*/}

    <ThemeSwitcherContextProvider>

      <Header />

      <Component {...pageProps} />

    </ThemeSwitcherContextProvider>

    </>
  );
}
