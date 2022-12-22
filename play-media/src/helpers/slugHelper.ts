import slugifyLib from 'slugify';

export const slugify = (prop: string): string => {
  return slugifyLib(prop, {lower: true });
};