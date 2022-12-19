import { FunctionComponent, ReactNode } from 'react';
import { RichTextResponseItem } from './types/response';

const getComponentFromChild = (
  child: any,
  componentMap: Record<string, FunctionComponent>
): ReactNode => {
  if (child?.content?.length) {
    return componentMap[child.type](
      child,
      child.content.map((childContext: any) => getComponentFromChild(childContext, componentMap))
    );
  }

  return componentMap[child.type](child);
};

export const getComponentTree = (content: any, componentMap: any) => {
  return content.map((element: any) => getComponentFromChild(element, componentMap));
};
