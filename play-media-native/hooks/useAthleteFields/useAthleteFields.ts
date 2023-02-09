import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  AthleteField,
  edit,
  remove,
  replace,
  reset,
} from "../../store/athleteFields";

export const useAthleteFields = () => {
  const athleteFields = useSelector((state: RootState) => state.athleteFields);
  const dispatch = useDispatch();

  return {
    athleteFields,
    edit: useCallback(
      (field: AthleteField) => {
        dispatch(edit(field));
      },
      [dispatch]
    ),
    remove: useCallback((item: any) => dispatch(remove(item)), [dispatch]),
    replace: useCallback((item: any) => dispatch(replace(item)), [dispatch]),
    reset: useCallback(() => dispatch(reset()), [dispatch]),
  };
};
