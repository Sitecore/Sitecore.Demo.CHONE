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

const updateTagVersion = (tag: string): string => {
  let tagVersion = tag.split('-')[2];
  tagVersion = tagVersion.substring(1);

  let buildNumber = tagVersion.split('.').map((x) => parseInt(x))[2];
  buildNumber += 1;

  return `v${packageJson.baseVersion}.${buildNumber}`;
};

const updateTagName = (tag: string): string => {
  let newTagVersion = updateTagVersion(tag);

  return sourceBranch === 'main' ? `APK-stable-${newTagVersion}` : `APK-nightly-${newTagVersion}`;
};

// Retrieve the latest nightly tag name and update it
const tagName = await request('GET /repos/{owner}/{repo}/releases', {
  ...defaultOptions,
  headers: defaultHeaders,
}).then(
  (res: { data: any[] }) =>
    res.data.find((release: { prerelease: boolean }) => release.prerelease === true).tag_name
);

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
