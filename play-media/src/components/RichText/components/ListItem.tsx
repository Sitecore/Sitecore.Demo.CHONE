import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const ListItem: FC<Props> = ({ children }) => <li>{children}</li>;
