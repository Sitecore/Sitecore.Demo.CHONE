import { CONTENT_TYPES, FIELD_TYPES } from '../../constants/contentTypes';
import { ContentItemFields } from '../ContentItemFields/ContentItemFields';

const FIELD_OVERRIDES = {
  body: {
    defaultValue: null,
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.RichText,
    title: 'Body',
  },
  isFeatured: {
    defaultValue: false,
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.Boolean,
    title: 'Is featured?',
  },
  location: {
    defaultValue: '',
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Location',
  },
  title: {
    defaultValue: '',
    required: true,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Title',
  },
  teaser: {
    defaultValue: '',
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.ShortText,
    title: 'Teaser',
  },
  timeAndDate: {
    defaultValue: null,
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.Date,
    title: 'Time & Date',
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
  featuredImage: {
    defaultValue: null,
    required: false,
    renderItem: null,
    single: true,
    type: FIELD_TYPES.Media,
    title: 'Featured Image',
  },
  relatedMedia: {
    defaultValue: [],
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.Media,
    title: 'Related Media',
  },
  athletes: {
    defaultValue: [],
    referenceType: CONTENT_TYPES.ATHLETE,
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.Reference,
    title: 'Athletes',
  },
  similarEvents: {
    defaultValue: [],
    referenceType: CONTENT_TYPES.EVENT,
    required: false,
    renderItem: null,
    single: false,
    type: FIELD_TYPES.Reference,
    title: 'Related Events',
  },
};

export const FieldsEvent = ({
  initialRoute,
  requiredOnly,
  showLimited = false,
  stateKey,
}: {
  initialRoute: string;
  requiredOnly?: boolean;
  showLimited?: boolean;
  stateKey: string;
}) => {
  return (
    <ContentItemFields
      initialRoute={initialRoute}
      overrides={FIELD_OVERRIDES}
      requiredOnly={requiredOnly}
      showLimited={showLimited}
      stateKey={stateKey}
    />
  );
};
