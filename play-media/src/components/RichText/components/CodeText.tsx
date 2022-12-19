import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const CodeText: FC<Props> = ({ children }) => <code>{children}</code>;
