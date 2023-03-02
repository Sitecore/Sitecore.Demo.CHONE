import { IIndexable } from '../interfaces/indexable';

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

export const EVENT_FIELD_OVERRIDES: IIndexable = {
  featuredImage: { single: true },
  sport: { required: true, single: true },
  title: { required: true },
};

export const CREATE_EVENT_DISCARD_MESSAGE =
  'Are you sure you want to discard the new event or continue editing?';
