import { expect, test } from '@jest/globals';

import getBuildNumber from '../scripts/getGuildNumber';

test('APK-nightly-v1.1.1 build number is 1', () => {
  expect(getBuildNumber('APK-nightly-v1.1.1')).toBe(1);
});

test('APK-nightly-v1.1.123 build number is 123', () => {
  expect(getBuildNumber('APK-nightly-v1.1.123')).toBe(123);
});

test('APK-stable-v1.0.0 build number is 0', () => {
  expect(getBuildNumber('APK-stable-v1.0.0')).toBe(0);
});
