import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const RichTextContainer: FC<Props> = ({ children }) => <div>{children}</div>;
