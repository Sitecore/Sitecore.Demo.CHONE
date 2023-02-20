import { useQuery } from 'react-query';

import { getAllSports } from '../../api/queries/getSports';

export const useSportsQuery = () => useQuery('sports', () => getAllSports());
