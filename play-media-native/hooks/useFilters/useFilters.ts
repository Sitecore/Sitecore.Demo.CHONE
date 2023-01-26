import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  toggleVisible,
  setAthleteFiltersActive,
  setEventFiltersActive,
} from "../../store/filters";

export const useFilters = () => {
  const { visible, athleteFiltersActive, eventFiltersActive } = useSelector(
    (state: RootState) => state.filters
  );
  const dispatch = useDispatch();

  return {
    visible,
    athleteFiltersActive,
    eventFiltersActive,
    toggleVisible: () => dispatch(toggleVisible()),
    setAthleteFiltersActive: (activeFilters: number) => {
      dispatch(setAthleteFiltersActive(activeFilters));
    },
    setEventFiltersActive: (activeFilters: number) =>
      dispatch(setEventFiltersActive(activeFilters)),
  };
};
