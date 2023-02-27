import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IIndexable } from '../../interfaces/indexable';
import { RootState } from '../../store';
import {
  ContentItemField,
  edit,
  editMultiple,
  init,
  remove,
  replace,
  reset,
} from '../../store/contentItems';

export const useContentItems = () => {
  const contentItems = useSelector((state: RootState) => state.contentItems);
  const dispatch = useDispatch();

  return {
    contentItems,
    edit: useCallback(
      (field: ContentItemField) => {
        dispatch(edit(field));
      },
      [dispatch]
    ),
    editMultiple: useCallback(
      ({ id, fields }: { id: string; fields: IIndexable }) => {
        dispatch(editMultiple({ id, fields }));
      },
      [dispatch]
    ),
    init: useCallback(
      (payload: { id: string; fields?: any }) => {
        dispatch(init(payload));
      },
      [dispatch]
    ),
    remove: useCallback((item: ContentItemField) => dispatch(remove(item)), [dispatch]),
    replace: useCallback((item: ContentItemField) => dispatch(replace(item)), [dispatch]),
    reset: useCallback(({ id }: { id: string }) => dispatch(reset({ id })), [dispatch]),
  };
};
