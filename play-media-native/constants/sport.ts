import { FIELD_TYPES } from './contentTypes';

export const FIELD_OVERRIDES_SPORT = {
  featuredImage: {
    defaultValue: null,
    required: false,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Featured image',
  },
};
