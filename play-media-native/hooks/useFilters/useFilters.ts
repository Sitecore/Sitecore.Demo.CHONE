import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IIndexable } from '../../interfaces/indexable';
import { RootState } from '../../store';
import {
  toggleVisible,
  setAthleteFiltersActive,
  setEventFiltersActive,
  setMediaFiltersActive,
  setAthleteFilterValues,
  setEventFilterValues,
  setMediaFilterValues,
} from '../../store/filters';

export const useFilters = () => {
  const {
    visible,
    athleteFiltersActive,
    eventFiltersActive,
    mediaFiltersActive,
    athleteFilterValues,
    eventFilterValues,
    mediaFilterValues,
  } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  return {
    visible,
    athleteFiltersActive,
    eventFiltersActive,
    mediaFiltersActive,
    athleteFilterValues,
    eventFilterValues,
    mediaFilterValues,
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
    setMediaFiltersActive: useCallback(
      (activeFilters: number) => {
        dispatch(setMediaFiltersActive(activeFilters));
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
    setMediaFilterValues: useCallback(
      (eventFilterValues: IIndexable) => {
        dispatch(setMediaFilterValues(eventFilterValues));
      },
      [dispatch]
    ),
  };
};
