export const getGridImageSize = (index: number) => {
  if (index === 0) {
    return '(max-width: 1200px) 66vw, 33vw';
  }

  return '(max-width: 1200px) 33vw, 164px';
};

export const getSlideImageSize = () => '(max-width: 1200px) 100vw, 60%';
