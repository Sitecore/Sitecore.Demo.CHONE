import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export const CodeBlock: FC<Props> = ({ children }) => (
  <section className="code-block">
    <code>{children}</code>
  </section>
);
