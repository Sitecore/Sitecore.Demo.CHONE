import ColorHash from 'color-hash';

import { theme } from '../theme/theme';

export const getAccentColor = (str: string | undefined) => {
  if (!str) return;

  switch (str.toLowerCase()) {
    case 'mountain biking':
      return '#ff8d00';
    case 'snowboarding':
      return '#006ef9';
    case 'skateboarding':
      return '#ff1886';
    case 'climbing':
      return '#ffd31c';
    default:
      return new ColorHash({
        hue: { min: 0, max: 270 },
        saturation: 1,
        lightness: getLightnessArr(49, 70),
      }).hex(str);
  }
};

const getLightnessArr = (min: number, max: number) => {
  return Array.from({ length: max - min + 1 }, (_, index) => (min + index) / 100);
};

export const getTextColor = (color: string | undefined) => {
  if (!color) return;

  const c = color.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma > 160 ? theme.colors.black.darkest : theme.colors.white.DEFAULT;
};
