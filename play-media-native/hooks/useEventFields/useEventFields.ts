import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  EventField,
  edit,
  init,
  remove,
  replace,
  reset,
} from "../../store/eventFields";
import { Event } from "../../interfaces/event";

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
