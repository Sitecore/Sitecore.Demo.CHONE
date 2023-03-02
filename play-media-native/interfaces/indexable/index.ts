import { ReactNode } from 'react';

export interface IIndexable {
  [key: string]: any;
}

export interface IFieldOverride {
  defaultValue: any;
  referenceType?: string;
  required: boolean;
  renderItem: ReactNode;
  single: boolean;
  title: string;
  type: string;
}
