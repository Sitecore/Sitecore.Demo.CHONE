import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IIndexable } from '../../interfaces/indexable';
import { RootState } from '../../store';
import {
  toggleVisible,
  setAthleteFiltersActive,
  setEventFiltersActive,
  setAthleteFilterValues,
  setEventFilterValues,
} from '../../store/filters';

export const useFilters = () => {
  const {
    visible,
    athleteFiltersActive,
    eventFiltersActive,
    athleteFilterValues,
    eventFilterValues,
  } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  return {
    visible,
    athleteFiltersActive,
    eventFiltersActive,
    athleteFilterValues,
    eventFilterValues,
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
    setAthleteFilterValues: useCallback(
      (athleteFilterValues: IIndexable) => {
        dispatch(setAthleteFilterValues(athleteFilterValues));
      },
      [dispatch]
    ),
    setEventFilterValues: useCallback(
      (eventFilterValues: IIndexable) => {
        dispatch(setEventFilterValues(eventFilterValues));
      },
      [dispatch]
    ),
  };
};
