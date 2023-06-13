import getBuildNumber from './getBuildNumber';

const updateTagVersion = (tag: string, baseVersion: string): string => {
  const tagSegments = tag.split('-');
  let buildNumber = getBuildNumber(tag);
  buildNumber += 1;

  return `${tagSegments[0]}-${tagSegments[1]}-v${baseVersion}.${buildNumber}`;
};

export default updateTagVersion;
