import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const BulletList: FC<Props> = ({ children }) => (
  <ul className="list bullet-list">{children}</ul>
);
