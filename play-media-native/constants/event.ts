import { CONTENT_TYPES, FIELD_TYPES } from './contentTypes';

export const EVENT_INITIAL_STATE = {
  body: null,
  isFeatured: false,
  location: '',
  title: '',
  teaser: '',
  timeAndDate: null,
  sport: null,
  featuredImage: null,
  relatedMedia: [],
  athletes: [],
  similarEvents: [],
};

export const FIELD_OVERRIDES_EVENT = {
  body: {
    defaultValue: null,
    required: false,
    single: false,
    type: FIELD_TYPES.RichText,
    title: 'Body',
  },
  isFeatured: {
    defaultValue: false,
    required: false,
    single: false,
    type: FIELD_TYPES.Boolean,
    title: 'Is featured?',
  },
  location: {
    defaultValue: '',
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Location',
  },
  title: {
    defaultValue: '',
    required: true,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Title',
  },
  teaser: {
    defaultValue: '',
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Teaser',
  },
  timeAndDate: {
    defaultValue: null,
    required: false,
    single: false,
    type: FIELD_TYPES.Date,
    title: 'Time & Date',
  },
  sport: {
    defaultValue: null,
    referenceType: CONTENT_TYPES.SPORT,
    required: true,
    single: true,
    type: FIELD_TYPES.Reference,
    title: 'Sport',
  },
  featuredImage: {
    defaultValue: null,
    required: false,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Featured Image',
  },
  relatedMedia: {
    defaultValue: [],
    required: false,
    single: false,
    type: FIELD_TYPES.Media,
    title: 'Related Media',
  },
  athletes: {
    defaultValue: [],
    referenceType: CONTENT_TYPES.ATHLETE,
    required: false,
    single: false,
    type: FIELD_TYPES.Reference,
    title: 'Athletes',
  },
  similarEvents: {
    defaultValue: [],
    referenceType: CONTENT_TYPES.EVENT,
    required: false,
    single: false,
    type: FIELD_TYPES.Reference,
    title: 'Related Events',
  },
};

export const CREATE_EVENT_DISCARD_MESSAGE =
  'Are you sure you want to discard the new event or continue editing?';

export const EDIT_EVENT_DISCARD_MESSAGE =
  'Are you sure you want to discard the changes or continue editing?';
