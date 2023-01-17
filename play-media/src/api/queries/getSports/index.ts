import { fetchGraphQL } from '../..';
import { AllSportsResponse, Sport } from '../../../interfaces/sport';

const sportsQuery = `
query {
  allSport (first: 100) {
    results {
      id
      title
      description
      color
    }
  }
}
`;

export const getAllSports = async (): Promise<Partial<Sport>[] | null> => {
  try {
    const results: AllSportsResponse = (await fetchGraphQL(sportsQuery)) as AllSportsResponse;
    const sports: Partial<Sport>[] = [];

    results.data.allSport.results.forEach((sport: Partial<Sport>) => {
      sports.push({
        id: sport.id,
        title: sport.title,
        description: sport.description,
        color: sport.color,
      });
    });

    return sports;
  } catch {
    return null;
  }
};
