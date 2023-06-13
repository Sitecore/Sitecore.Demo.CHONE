import { expect, test } from '@jest/globals';

import getLatestTagNameWithBaseVersion from '../scripts/getLatestTagNameWithBaseVersion';

const releases = [
  {
    tag_name: 'APK-nightly-v1.1.0',
  },
  {
    tag_name: 'APK-nightly-v1.1.1',
  },
  {
    tag_name: 'APK-nightly-v1.1.2',
  },
  {
    tag_name: 'APK-stable-v1.1.3',
  },
];

test('Given undefined releases, latest release tag name is undefined', () => {
  expect(getLatestTagNameWithBaseVersion(undefined, '1.1')).toBeUndefined();
});

test('Given empty releases, latest release tag name is undefined', () => {
  expect(getLatestTagNameWithBaseVersion([], '1.1')).toBeUndefined();
});

test('Given no release with a base release, latest release tag name is undefined', () => {
  expect(getLatestTagNameWithBaseVersion(releases, '1.0')).toBeUndefined();
});

test('Given valid releases, latest 1.1 release tag name is APK-stable-v1.1.3', () => {
  expect(getLatestTagNameWithBaseVersion(releases, '1.1')).toBe('APK-stable-v1.1.3');
});
