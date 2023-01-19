import { ReactNode } from "react";

const getComponentFromChild = (
  child: any,
  componentMap: Record<
    string,
    (context: any, children: any, key: string) => ReactNode
  >,
  ...indexes: number[]
): ReactNode => {
  const key = indexes.join("_");

  if (child?.content?.length) {
    return componentMap[child.type](
      child,
      child.content.map((childContext: any, childIndex: number) =>
        getComponentFromChild(
          childContext,
          componentMap,
          ...indexes,
          childIndex
        )
      ),
      key
    );
  }

  return componentMap[child.type](child, null, key);
};

export const getComponentTree = (content: any, componentMap: any) => {
  console.log(content);
  return content.map((element: any, index: number) =>
    getComponentFromChild(element, componentMap, index)
  );
};
