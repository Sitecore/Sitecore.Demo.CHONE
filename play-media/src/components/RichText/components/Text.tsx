import clsx from 'clsx';
import { FC, useMemo } from 'react';

interface Props {
  children: string;
  marks?: Array<{ type: string }>;
}

export const Text: FC<Props> = ({ children, marks = [] }) => {
  const allStyles = useMemo(() => clsx(['text', marks.map((mark) => mark.type)]), [marks]);

  return <span className={allStyles}>{children}</span>;
};
