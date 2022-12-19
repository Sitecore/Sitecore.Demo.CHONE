export const slugify = (prop: string | undefined): string => {
  return prop ? prop.toLowerCase().split(' ').join('-') : '';
};
