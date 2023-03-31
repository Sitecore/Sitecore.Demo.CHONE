import { CONTENT_TYPES, FIELD_TYPES } from './contentTypes';

export const FIELD_OVERRIDES_ATHLETE = {
  athleteName: {
    defaultValue: '',
    required: true,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Name',
  },
  sport: {
    defaultValue: null,
    referenceType: CONTENT_TYPES.SPORT,
    required: true,
    renderItem: null,
    single: true,
    type: FIELD_TYPES.Reference,
    title: 'Sport',
  },
  nationality: {
    defaultValue: '',
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Nationality',
  },
  dateOfBirth: {
    defaultValue: null,
    required: false,
    single: false,
    type: FIELD_TYPES.Date,
    title: 'Birth day',
  },
  isFeatured: {
    defaultValue: false,
    required: false,
    single: true,
    type: FIELD_TYPES.Boolean,
    title: 'Is featured?',
  },
  athleteQuote: {
    defaultValue: '',
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Quote',
  },
  careerStartDate: {
    defaultValue: null,
    required: false,
    single: false,
    type: FIELD_TYPES.Date,
    title: 'Career start',
  },
  hobby: {
    defaultValue: '',
    required: false,
    single: true,
    type: FIELD_TYPES.ShortText,
    title: 'Hobby',
  },
  profilePhoto: {
    defaultValue: null,
    required: true,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Profile photo',
  },
  featuredImage: {
    defaultValue: null,
    required: false,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Featured image',
  },
  relatedMedia: {
    defaultValue: null,
    required: false,
    single: false,
    type: FIELD_TYPES.Media,
    title: 'Media',
  },
};

export const CREATE_ATHLETE_DISCARD_MESSAGE =
  'Are you sure you want to discard the new athlete or continue editing?';

export const EDIT_ATHLETE_DISCARD_MESSAGE =
  'Are you sure you want to discard the changes or continue editing?';
