import { fetchGraphQL } from '../..';
import { FetchOptions } from '../../../interfaces/fetchOptions';
import { AllSportsResponse, Sport, SportResponse } from '../../../interfaces/sport';

const sportsQuery = `
query {
  allSport (first: 100) {
    results {
      id
      title
      description
      featuredImage {
        results {
          id
          name
          fileUrl
          description
          fileHeight
          fileSize
          fileType
          fileWidth
        }
      }
    }
  }
}
`;

export const getAllSports = async (options?: FetchOptions): Promise<Sport[]> => {
  const results: AllSportsResponse = (await fetchGraphQL(
    sportsQuery,
    options
  )) as AllSportsResponse;
  const sports: Sport[] = [];

  results.data.allSport.results.forEach((sport: SportResponse) => {
    sports.push({
      id: sport.id,
      title: sport.title,
      description: sport.description,
      featuredImage: sport.featuredImage?.results[0] || null,
    });
  });

  return sports as Sport[];
};
