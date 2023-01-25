import Link from 'next/link';
import { ReactNode } from 'react';

type ConditionalLinkProps = {
  link: string | undefined;
  children: ReactNode;
};

export const ConditionalLink = ({ link, children }: ConditionalLinkProps) =>
  !!link ? <Link href={link}>{children}</Link> : <>{children}</>;
