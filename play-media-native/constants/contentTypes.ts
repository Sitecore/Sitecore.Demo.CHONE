export const CONTENT_TYPES = {
  ATHLETE: 'athlete',
  EVENT: 'event',
  SPORT: 'sport',
  MEDIA: 'media',
};

export const CONTENT_TYPE_ROUTES = {
  [CONTENT_TYPES.ATHLETE]: 'AddAthletes',
  [CONTENT_TYPES.EVENT]: 'AddEvents',
  [CONTENT_TYPES.SPORT]: 'AddSport',
};

export const FIELD_TYPES = {
  Boolean: 'boolean',
  Date: 'date',
  LongText: 'long-text',
  Media: 'media',
  Number: 'number',
  Reference: 'reference',
  RichText: 'rich-text',
  ShortText: 'short-text',
};

export const SIMPLE_FIELDS_INITIAL_VALUES = {
  [FIELD_TYPES.Boolean]: false,
  [FIELD_TYPES.Date]: null,
  [FIELD_TYPES.LongText]: '',
  [FIELD_TYPES.Number]: null,
  [FIELD_TYPES.RichText]: null,
  [FIELD_TYPES.ShortText]: '',
};
