import { request } from '@octokit/request';
import { execSync } from 'child_process';
import packageJson from '../package.json' assert { type: 'json' };

const token = process.env.GITHUB_TOKEN;
const sourceBranch: string = process.env.BUILD_SOURCEBRANCH!.endsWith('develop')
  ? 'develop'
  : 'main';

const defaultOptions = {
  owner: 'Sitecore',
  repo: 'Sitecore.Demo.CHONE',
};
const defaultHeaders = {
  authorization: `token ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

const getBuildNumber = (tag: string): number =>
  tag
    .split('-')[2]
    .substring(1)
    .split('.')
    .map((x: string) => parseInt(x))[2];

const updateTagVersion = (tag: string): string => {
  let buildNumber = getBuildNumber(tag);
  buildNumber += 1;

  return `v${packageJson.baseVersion}.${buildNumber}`;
};

const updateTagName = (tag: string): string => {
  let newTagVersion = updateTagVersion(tag);

  return sourceBranch === 'main' ? `APK-stable-${newTagVersion}` : `APK-nightly-${newTagVersion}`;
};

// Retrieve the latest nightly and stable tag name matching the base version and update the one with the highest build number
const tagName = await request('GET /repos/{owner}/{repo}/releases', {
  ...defaultOptions,
  headers: defaultHeaders,
}).then((res: { data: any[] }) => {
  const latestNightlyTagName = res.data.find(
    (release: { prerelease: boolean; tag_name: string }) =>
      release.prerelease === true &&
      release.tag_name.split('-')[2].startsWith(`v${packageJson.baseVersion}`)
  )?.tag_name;

  const latestStableTagName = res.data.find(
    (release: { prerelease: boolean; tag_name: string }) =>
      release.prerelease === false &&
      release.tag_name.split('-')[2].startsWith(`v${packageJson.baseVersion}`)
  )?.tag_name;

  if (!latestStableTagName) return latestNightlyTagName;
  if (!latestNightlyTagName) return latestStableTagName;

  return getBuildNumber(latestNightlyTagName) > getBuildNumber(latestStableTagName)
    ? latestNightlyTagName
    : latestStableTagName;
});

const newTagName = updateTagName(tagName);
const newTagVersion = newTagName.split('-')[2];

// Fetch the APK URL & file
const apkURL = execSync(
  'npx eas-cli build:list --json --non-interactive --limit=1 --platform=android | jq ".[0].artifacts.buildUrl"'
)
  .toString()
  .trim()
  .replace(/^"(.*)"$/, '$1');

let apkFile: any;
await fetch(apkURL).then(async (res) => {
  apkFile = await res.blob();
});

// Create a new release
await request('POST /repos/{owner}/{repo}/releases', {
  ...defaultOptions,
  headers: defaultHeaders,
  tag_name: newTagName,
  target_commitish: sourceBranch,
  name: `${sourceBranch === 'develop' ? 'Nightly' : 'Stable'} PLAY! Media APK ${newTagVersion}${
    sourceBranch === 'develop' ? '-nightly' : ''
  }`,
  body: `PLAY! Media Android APK file based on ${sourceBranch} branch`,
  draft: false,
  prerelease: sourceBranch === 'develop' ? true : false,
  make_latest: sourceBranch === 'develop' ? 'false' : 'true',
  generate_release_notes: false,
}).then(async (res: { data: { id: string; upload_url: string } }) => {
  const releaseID = res.data.id;
  const uploadURL = res.data.upload_url;

  // Upload the APK as a release asset
  await request(`POST ${uploadURL}`, {
    ...defaultOptions,
    headers: {
      ...defaultHeaders,
      'content-type': 'application/vnd.android.package-archive',
    },
    release_id: releaseID,
    name: `PLAY.Media_${newTagVersion}_${sourceBranch === 'develop' ? 'nightly' : 'stable'}.apk`,
    data: apkFile,
  });
});
