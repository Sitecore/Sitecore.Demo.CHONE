import { Athlete } from '../interfaces/athlete';
import { EventResponse } from '../interfaces/event';
import { IFieldOverride } from '../interfaces/indexable';
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
