import { useState } from "react";

export const useScrollOffset = (initialState: boolean) => {
  const [isTopEdge, setIsTopEdge] = useState(initialState);

  const calcScrollOffset = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsTopEdge(currentScrollPosition <= 0);
  };

  return {
    isTopEdge,
    setIsTopEdge,
    calcScrollOffset,
  };
};
