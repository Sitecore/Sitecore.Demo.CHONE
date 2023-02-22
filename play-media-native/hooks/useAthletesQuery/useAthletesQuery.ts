import { useQuery } from 'react-query';

import { getAllAthletes } from '../../api/queries/getAthletes';

export const useAthletesQuery = () =>
  useQuery('athletes', () => getAllAthletes(), {
    onSuccess: (athletes) => athletes.sort((a, b) => a.athleteName!.localeCompare(b.athleteName!)),
  });
