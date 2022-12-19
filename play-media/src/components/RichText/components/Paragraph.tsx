import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const Paragraph: FC<Props> = ({ children }) => <p>{children}</p>;
