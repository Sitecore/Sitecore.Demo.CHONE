import { useState } from 'react';
// import { LayoutAnimation } from 'react-native';

export const useScrollOffset = (initialState: boolean) => {
  const [isTopEdge, setIsTopEdge] = useState(initialState);

  const calcScrollOffset = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    // if (isTopEdge !== currentScrollPosition <= 0) {
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // }

    setIsTopEdge(currentScrollPosition <= 0);
  };

  return {
    isTopEdge,
    setIsTopEdge,
    calcScrollOffset,
  };
};
