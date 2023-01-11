import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import ThemeSwitcherContext from '../../store/themeSwitcherContext';

export const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNavClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const themeCtx: { isDarkTheme?: boolean; toggleThemeHandler: () => void } =
    useContext(ThemeSwitcherContext);

  const toggleThemeHandler = () => {
    themeCtx.toggleThemeHandler();
  };

  return (
    <header className={`header ${isExpanded ? 'expanded' : ''}`}>
      <div className="header-container">
        <Link href={'/'} passHref>
          <Image
            src={themeCtx.isDarkTheme ? '/play-media-logo.svg' : '/play-media-logo-dark.svg'}
            alt="PLAY! Media"
            width={260}
            height={50}
            className="header-logo"
          />
        </Link>
        <button className="menu-button" onClick={() => setIsExpanded(!isExpanded)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav>
          <ul>
            <li>
              <Link href={'/'} onClick={handleNavClose}>
                Events
              </Link>
            </li>
            <li>
              <Link href={'/athletes'} onClick={handleNavClose}>
                Athletes
              </Link>
            </li>
            <li>
              <Link href={'/about'} onClick={handleNavClose}>
                About
              </Link>
            </li>
            <li>
              <div className="theme-switcher" onClick={toggleThemeHandler}>
                <div className="theme-switcher-container">
                  <div className="moon-icon-container">
                    <span className="moon-icon">🌜</span>
                  </div>
                  <div className="sun-icon-container">
                    <span className="sun-icon">🌞</span>
                  </div>
                  <div className="theme-switcher-bullet"></div>
                </div>
                <input type="checkbox" aria-label="Switch between dark and light mode" />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
