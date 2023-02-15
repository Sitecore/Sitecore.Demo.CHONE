import { ReactNode } from 'react';

const getComponentFromChild = (
  child: any,
  componentMap: Record<string, (context: any, children: any, key: string) => ReactNode>,
  ...indexes: number[]
): ReactNode => {
  const key = indexes.join('_');
  const unsupportedTypeWarning = () =>
    console.warn(`Unsupported rich text content type: ${child.type}`);

  if (child?.content?.length) {
    if (!componentMap[child.type]) {
      unsupportedTypeWarning();
      return;
    }

    return componentMap[child.type](
      child,
      child.content.map((childContext: any, childIndex: number) =>
        getComponentFromChild(childContext, componentMap, ...indexes, childIndex)
      ),
      key
    );
  }

  if (!componentMap[child.type]) {
    unsupportedTypeWarning();
  } else {
    return componentMap[child.type](child, null, key);
  }
};

export const getComponentTree = (content: any, componentMap: any) => {
  return content.map((element: any, index: number) =>
    getComponentFromChild(element, componentMap, index)
  );
};
