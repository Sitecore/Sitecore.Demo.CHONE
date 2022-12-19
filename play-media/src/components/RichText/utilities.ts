import { FunctionComponent, ReactNode } from 'react';
import { RichTextResponseItem } from './types/response';

const getComponentFromChild = (
  child: any,
  componentMap: Record<string, FunctionComponent>,
  ...indexes: number[]
): ReactNode => {
  const key = indexes.join('_');

  if (child?.content?.length) {
    return componentMap[child.type](
      child,
      child.content.map((childContext: any, childIndex: number) => getComponentFromChild(childContext, componentMap, ...indexes, childIndex)),
      key
    );
  }

  return componentMap[child.type](child, key);
};

export const getComponentTree = (content: any, componentMap: any) => {
  return content.map((element: any, index: number) => getComponentFromChild(element, componentMap, index));
};
