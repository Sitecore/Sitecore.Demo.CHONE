import { useMemo } from 'react';

import { IIndexable } from '../../interfaces/indexable';

const shouldItemPass = (item: any, facets: IIndexable) => {
  let shouldPass = true;

  Object.keys(facets).forEach((key) => {
    if (!facets[key]) {
      return;
    }

    if (item[key] !== facets[key]) {
      shouldPass = false;
    }
  });

  return shouldPass;
};

export const useFacets = ({
  initialItems,
  facets,
}: {
  initialItems: Record<string, any>[];
  facets: IIndexable;
}) => {
  const filteredItems = useMemo(
    () => initialItems.filter((item) => shouldItemPass(item, facets)),
    [facets, initialItems]
  );

  return filteredItems;
};
