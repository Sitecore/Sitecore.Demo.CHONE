import { Dispatch, SetStateAction } from "react";
import { MOCK_FETCH_TIMEOUT, PAGE_SIZE } from "../constants/pagination";

export const getInitialData = (initialData: any[]) => {
  if (!initialData) {
    return [];
  }

  return initialData.length > PAGE_SIZE
    ? initialData.slice(0, PAGE_SIZE)
    : initialData;
};

export const mockFetchData = (
  totalItems: any[],
  displayedItems: any[],
  setState: Dispatch<SetStateAction<any[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  setTimeout(() => {
    const lastItemIndex = displayedItems.length - 1;
    const nextItems =
      totalItems.length - displayedItems.length >= PAGE_SIZE
        ? totalItems.slice(lastItemIndex + 1, lastItemIndex + PAGE_SIZE + 1)
        : totalItems.slice(lastItemIndex + 1, totalItems.length);

    setState(displayedItems.concat(nextItems));
    setLoading(false);
  }, MOCK_FETCH_TIMEOUT);
};
