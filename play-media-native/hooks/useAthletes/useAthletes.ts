import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { add, clear, remove } from "../../store/athletes";
import { Athlete } from "../../interfaces/athlete";

export const useAthletes = () => {
  const { athletes } = useSelector((state: RootState) => state.athletes);
  const dispatch = useDispatch();

  return {
    athletes,
    add: useCallback(
      (athletes: Athlete[]) => dispatch(add(athletes)),
      [dispatch]
    ),
    clear: useCallback(() => dispatch(clear()), [dispatch]),
    remove: useCallback(
      (athletes: Athlete[]) => dispatch(remove(athletes)),
      [dispatch]
    ),
  };
};
