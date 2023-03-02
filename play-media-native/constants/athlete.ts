import { CONTENT_TYPES, FIELD_TYPES } from './contentTypes';

export const FIELD_OVERRIDES_ATHLETE = {
  athleteName: {
    defaultValue: '',
    required: true,
    single: false,
    type: FIELD_TYPES.Reference,
    title: 'Name',
  },
  athleteQuote: {
    defaultValue: '',
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Athlete quote',
  },
  careerStartDate: {
    defaultValue: null,
    required: false,
    single: false,
    type: FIELD_TYPES.Date,
    title: 'Career start date',
  },
  dateOfBirth: {
    defaultValue: null,
    required: false,
    single: false,
    type: FIELD_TYPES.Media,
    title: 'Date of birth',
  },
  featuredImage: {
    defaultValue: null,
    required: false,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Featured image',
  },
  hobby: {
    defaultValue: '',
    required: false,
    single: true,
    type: FIELD_TYPES.ShortText,
    title: 'Hobby',
  },
  isFeatured: {
    defaultValue: false,
    required: false,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Is featured?',
  },
  nationality: {
    defaultValue: '',
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Nationality',
  },
  profilePhoto: {
    defaultValue: null,
    required: true,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Profile photo',
  },
  relatedMedia: {
    defaultValue: null,
    required: true,
    single: false,
    type: FIELD_TYPES.Media,
    title: 'Related Media',
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
};

export const CREATE_ATHLETE_DISCARD_MESSAGE =
  'Are you sure you want to discard the new athlete or continue editing?';

export const EDIT_ATHLETE_DISCARD_MESSAGE =
  'Are you sure you want to discard the changes or continue editing?';
