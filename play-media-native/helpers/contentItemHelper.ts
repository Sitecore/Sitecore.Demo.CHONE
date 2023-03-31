import { FIELD_TYPES, SIMPLE_FIELDS_INITIAL_VALUES } from '../constants/contentTypes';
import { Athlete } from '../interfaces/athlete';
import { IFieldOverride } from '../interfaces/contentItem';
import { EventResponse } from '../interfaces/event';
import { IIndexable } from '../interfaces/indexable';
import { Sport } from '../interfaces/sport';

const ADD_BUTTON_LABEL = 'Add';
const REPLACE_BUTTON_LABEL = 'Change';

// Helper function to map a content item into a suitable form for the API request
export const mapContentItem = (
  obj: Partial<EventResponse> | Partial<Athlete> | Partial<Sport>,
  fn: (key: string, value: unknown, index?: number) => unknown
) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value], index) => [key, fn(key, value, index)])
  );

// Extract only ID from reference values in fields
//
export const mapContentItemToId = (key: string, value: unknown) => ({
  value: value?.['results']
    ? [...value['results'].map((obj: { id: string }) => ({ id: obj.id }))]
    : value,
});

// Get the label of reference field form button based on whether it accepts a single value and has a value already
//
export const getReferenceFieldButtonLabel = (empty: boolean, single: boolean) => {
  if (empty) {
    return ADD_BUTTON_LABEL;
  }

  return single ? REPLACE_BUTTON_LABEL : ADD_BUTTON_LABEL;
};

// Get the icon of reference field form button based on whether it accepts a single value and has a value already
//
export const getReferenceFieldIcon = (empty: boolean, single: boolean) => {
  if (!single) {
    return 'plus';
  }

  return empty ? 'plus' : 'pencil';
};

export const getRequiredOverrides = (
  overrides: Record<string, IFieldOverride>
): Record<string, IFieldOverride> => {
  const filtered = {};

  Object.entries(overrides).forEach(([overrideKey, override]) => {
    if (override.required) {
      filtered[overrideKey] = override;
    }
  });

  return filtered;
};

export const getNonRequiredOverrides = (
  overrides: Record<string, IFieldOverride>
): Record<string, IFieldOverride> => {
  const filtered = {};

  Object.entries(overrides).forEach(([overrideKey, override]) => {
    if (!override.required) {
      filtered[overrideKey] = override;
    }
  });

  return filtered;
};

export const canSubmitContentItem = (
  fields: IIndexable,
  overrides: Record<string, IFieldOverride>
) => {
  if (!fields) {
    return false;
  }

  let canSubmit = true;

  for (const field in overrides) {
    if (overrides[field].required && !fields[field]) {
      canSubmit = false;
    }
  }

  return canSubmit;
};

// Provides initial values for global state create flow based on a field's definition
//
const getFieldInitialValue = (definition: IFieldOverride) => {
  if (definition?.defaultValue) {
    return definition.defaultValue;
  }

  if (definition?.type === FIELD_TYPES.Reference || definition?.type === FIELD_TYPES.Media) {
    return definition?.single ? null : [];
  }

  return SIMPLE_FIELDS_INITIAL_VALUES[definition?.type];
};

// Get initialState of content item based on its field overrides
//
export const getInitialStateFromOverrides = (overrides: Record<string, IFieldOverride>) => {
  if (!overrides) {
    return {};
  }

  const initialState = {};

  Object.entries(overrides).forEach(([overrideKey, override]) => {
    initialState[overrideKey] = getFieldInitialValue(override);
  });

  return initialState;
};

// Get value of reference depending on if it's single or not
// For single fields, get the first item of an array or null
// For non-single items get the array itself
//
export const resolveReferenceValue = (value: IIndexable[], single: boolean) => {
  if (single) {
    return value[0] || null;
  }

  return value || [];
};

// Simplify content item object by removing nested objects with 'results' prop
//
export const normalizeContentItem = (
  contentItemResponse: IIndexable,
  overrides: Record<string, IFieldOverride>
) => {
  const contentItem = {};

  Object.entries(contentItemResponse).forEach(([fieldKey, fieldValue]) => {
    if (fieldValue?.results) {
      contentItem[fieldKey] = resolveReferenceValue(
        fieldValue?.results,
        overrides[fieldKey]?.single
      );
    } else {
      contentItem[fieldKey] = contentItemResponse[fieldKey];
    }
  });

  return contentItem;
};

// Prepare reference field request object depending on if it has mulitple or a single value
//
const prepareReferenceRequest = (
  referenceState: IIndexable | IIndexable[],
  override: IFieldOverride
) => {
  return Array.isArray(referenceState)
    ? { results: [...referenceState] }
    : { results: referenceState ? [referenceState] : [] };
};

// Map content item to a form suitable for API request (wrap references and media in object with 'results' prop)
//
export const prepareRequestFields = (
  contentItem: IIndexable,
  overrides: Record<string, IFieldOverride>
) => {
  const requestObject = {};

  Object.entries(overrides).forEach(([overrideKey, override]) => {
    if (override?.type === FIELD_TYPES.Reference || override?.type === FIELD_TYPES.Media) {
      requestObject[overrideKey] = prepareReferenceRequest(contentItem[overrideKey], override);
    } else {
      requestObject[overrideKey] = contentItem[overrideKey] ?? null;
    }
  });

  return requestObject;
};
