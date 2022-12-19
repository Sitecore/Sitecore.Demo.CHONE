import { FC, useCallback, useMemo } from 'react';

interface Props {
  children: string;
  href: string;
  target: string;
}

export const RichTextLink: FC<Props> = ({ children, href, target }) => {
  const getValidLink = useCallback((href: string) => {
    const isValid = href.includes('https://') || href.includes('http://');

    if (isValid) {
      return href;
    }

    return `https://${href}`;
  }, []);

  return (
    <a href={getValidLink(href)} target={target}>
      {children}
    </a>
  );
};
