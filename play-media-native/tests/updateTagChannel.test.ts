import { expect, test } from '@jest/globals';

import updateTagChannel from '../scripts/updateTagChannel';

test('APK-dummy-v1.0.0 with source branch main updates to APK-stable-v1.0.0', () => {
  expect(updateTagChannel('APK-dummy-v1.0.0', 'main')).toBe('APK-stable-v1.0.0');
});

test('APK-dummy-v1.0.0 with source branch develop updates to APK-nightly-v1.0.0', () => {
  expect(updateTagChannel('APK-dummy-v1.0.0', 'develop')).toBe('APK-nightly-v1.0.0');
});
