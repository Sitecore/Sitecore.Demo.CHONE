import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

export const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNavClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <header className={`header ${isExpanded ? 'expanded' : ''}`}>
      <div className="header-container">
        <Link href={'/'} passHref>
          <Image
            src="/play-media-logo.svg"
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
          </ul>
        </nav>
      </div>
    </header>
  );
};
