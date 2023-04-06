import { FIELD_TYPES } from './contentTypes';

export const MEDIA_SOURCES = {
  CAMERA: 'camera',
  CH_ONE: 'ch_one',
  LIBRARY: 'library',
};

export const FIELD_OVERRIDES_MEDIA = {
  name: {
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Title',
  },
  description: {
    required: false,
    single: false,
    type: FIELD_TYPES.LongText,
    title: 'Description',
  },
};

export const MEDIA_UPDATED_SUCCESSFULLY_TIMEOUT = 2000;
export const MEDIA_ERROR_WHILE_UPDATING_TIMEOUT = 3000;

export const CREATE_MEDIA_DISCARD_MESSAGE =
  'Are you sure you want to discard the new media or continue editing?';

export const EDIT_MEDIA_DISCARD_MESSAGE =
  'Are you sure you want to discard the changes or continue editing?';
