import { fetchGraphQL } from '../..';
import { FetchOptions } from '../../../interfaces/fetchOptions';
import { AllSportsResponse, Sport } from '../../../interfaces/sport';

const sportsQuery = `
query {
  allSport (first: 100) {
    results {
      id
      title
      description
    }
  }
}
`;

export const getAllSports = async (options?: FetchOptions): Promise<Sport[]> => {
  const results: AllSportsResponse = (await fetchGraphQL(
    sportsQuery,
    options
  )) as AllSportsResponse;
  const sports: Partial<Sport>[] = [];

  results.data.allSport.results.forEach((sport: Partial<Sport>) => {
    sports.push({
      id: sport.id,
      title: sport.title,
      description: sport.description,
    });
  });

  return sports as Sport[];
};
