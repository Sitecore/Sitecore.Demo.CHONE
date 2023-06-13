const getBuildNumber = (tag: string): number =>
  parseInt(tag.split('-')[2].substring(1).split('.')[2], 10);

export default getBuildNumber;
