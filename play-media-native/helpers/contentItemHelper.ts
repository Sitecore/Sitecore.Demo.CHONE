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
