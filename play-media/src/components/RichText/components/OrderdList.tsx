import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const OrderedList: FC<Props> = ({ children }) => (
  <ol className="list ordered-list">{children}</ol>
);
