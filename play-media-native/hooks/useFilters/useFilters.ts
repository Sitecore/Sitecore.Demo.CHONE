import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { toggleVisible, setAthleteFiltersActive, setEventFiltersActive } from '../../store/filters';

export const useFilters = () => {
  const { visible, athleteFiltersActive, eventFiltersActive } = useSelector(
    (state: RootState) => state.filters
  );
  const dispatch = useDispatch();

  return {
    visible,
    athleteFiltersActive,
    eventFiltersActive,
    toggleVisible: useCallback(() => dispatch(toggleVisible()), [dispatch]),
    setAthleteFiltersActive: useCallback(
      (activeFilters: number) => {
        dispatch(setAthleteFiltersActive(activeFilters));
      },
      [dispatch]
    ),
    setEventFiltersActive: useCallback(
      (activeFilters: number) => {
        dispatch(setEventFiltersActive(activeFilters));
      },
      [dispatch]
    ),
  };
};
