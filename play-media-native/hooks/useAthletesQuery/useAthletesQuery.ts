import { useQuery } from 'react-query';

import { getAllAthletes } from '../../api/queries/getAthletes';

export const useAthletesQuery = (id = undefined, status = undefined) =>
  useQuery('athletes', () => getAllAthletes(), {
    onSuccess: (athletes) => {
      athletes.sort((a, b) => a.athleteName!.localeCompare(b.athleteName!));

      // Manually update selected athlete's status
      if (id && status) {
        athletes.find((athlete) => athlete.id === id).status = status;
      }
    },
  });
