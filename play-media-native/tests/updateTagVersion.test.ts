import { expect, test } from '@jest/globals';

import updateTagVersion from '../scripts/updateTagVersion';

test('APK-dummy-v1.0.0 with base version 1.0 updates to APK-dummy-v1.0.1', () => {
  expect(updateTagVersion('APK-dummy-v1.0.0', '1.0')).toBe('APK-dummy-v1.0.1');
});

test('APK-dummy-v1.0.0 with base version 1.1 updates to APK-dummy-v1.1.1', () => {
  expect(updateTagVersion('APK-dummy-v1.0.0', '1.1')).toBe('APK-dummy-v1.1.1');
});
