import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Event } from '../../interfaces/event';
import { IIndexable } from '../../interfaces/indexable';
import { RootState } from '../../store';
import {
  EventField,
  edit,
  editMultiple,
  init,
  remove,
  replace,
  reset,
} from '../../store/eventFields';

export const useEventFields = () => {
  const eventFields = useSelector((state: RootState) => state.eventFields);
  const dispatch = useDispatch();

  return {
    eventFields,
    edit: useCallback(
      (field: EventField) => {
        dispatch(edit(field));
      },
      [dispatch]
    ),
    editMultiple: useCallback(
      (field: IIndexable) => {
        dispatch(editMultiple(field));
      },
      [dispatch]
    ),
    init: useCallback(
      (event: Event) => {
        dispatch(init(event));
      },
      [dispatch]
    ),
    remove: useCallback((item: any) => dispatch(remove(item)), [dispatch]),
    replace: useCallback((item: any) => dispatch(replace(item)), [dispatch]),
    reset: useCallback(() => dispatch(reset()), [dispatch]),
  };
};
