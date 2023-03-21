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
  title: {
    required: true,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Title',
  },
  sport: {
    referenceType: CONTENT_TYPES.SPORT,
    required: true,
    single: true,
    type: FIELD_TYPES.Reference,
    title: 'Sport',
  },
  timeAndDate: {
    required: false,
    single: false,
    type: FIELD_TYPES.Date,
    title: 'Time & Date',
  },
  location: {
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Location',
  },
  isFeatured: {
    required: false,
    single: false,
    type: FIELD_TYPES.Boolean,
    title: 'Is featured?',
  },
  teaser: {
    required: false,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Summary',
  },
  body: {
    required: false,
    single: false,
    type: FIELD_TYPES.RichText,
    title: 'Description',
  },
  featuredImage: {
    required: false,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Featured Image',
  },
  relatedMedia: {
    required: false,
    single: false,
    type: FIELD_TYPES.Media,
    title: 'Media',
  },
  athletes: {
    referenceType: CONTENT_TYPES.ATHLETE,
    required: false,
    single: false,
    type: FIELD_TYPES.Reference,
    title: 'Athletes',
  },
  similarEvents: {
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
