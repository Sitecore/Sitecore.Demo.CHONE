import getBuildNumber from './getBuildNumber';

type Release = {
  tag_name: string;
};

const getLatestTagNameWithBaseVersion = (releases: Release[] | undefined, baseVersion: string) => {
  if (!releases || releases.length === 0) {
    return undefined;
  }

  const releasesFromTheBaseVersion = releases.filter((release) =>
    release?.tag_name?.split('-')[2].startsWith(`v${baseVersion}.`)
  );

  if (!releasesFromTheBaseVersion || releasesFromTheBaseVersion.length === 0) {
    return undefined;
  }

  return releasesFromTheBaseVersion.sort(
    (a, b) => getBuildNumber(b.tag_name) - getBuildNumber(a.tag_name)
  )[0].tag_name;
};

export default getLatestTagNameWithBaseVersion;
