import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import ThemeSwitcherContext from '../../store/themeSwitcherContext';

export const Footer = () => {

  return (
    <footer className="py-5 border-t border-gray-200">
<div className="cookie-consent-banner">
  <div className="cookie-consent-banner__inner">
    <div className="cookie-consent-banner__copy">
      <div className="cookie-consent-banner__header">THIS WEBSITE USES COOKIES</div>
      <div className="cookie-consent-banner__description">We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services. You consent to our cookies if you continue to use our website.</div>
    </div>

    <div className="cookie-consent-banner__actions">
      <a href="#" className="cookie-consent-banner__cta">
        OK
      </a>
      
      <a href="#" className="cookie-consent-banner__cta cookie-consent-banner__cta--secondary">
        Decline
      </a>
    </div>
  </div>
</div>

  </footer>
  );
};
