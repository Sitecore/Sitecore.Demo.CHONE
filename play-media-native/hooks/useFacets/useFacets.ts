import Fuse from 'fuse.js';
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

export const useSearchFacets = ({
  initialItems,
  facets,
  query,
}: {
  initialItems: Record<string, any>[];
  facets: IIndexable;
  query: string;
}) => {
  const finalItems = useMemo(() => {
    const filteredItems = initialItems.filter((item) => shouldItemPass(item, facets));

    const fuse = new Fuse(filteredItems, {
      keys: ['name', 'athleteName'],
      threshold: 0.2,
    });

    const filteredQueryItems = !query ? filteredItems : fuse.search(query).map((item) => item.item);

    return filteredQueryItems;
  }, [facets, initialItems, query]);

  return finalItems;
};
