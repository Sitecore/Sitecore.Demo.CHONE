import { createElement, FC } from 'react';

interface Props {
  children: string;
  level: number;
}

export const Heading: FC<Props> = ({ children, level, ...props }) => {
  return createElement(`h${level}`, { ...props }, children);
};
