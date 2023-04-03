import { fetchGraphQL } from '../..';
import { STATUS_TYPES } from '../../../constants/status';
import { normalizeAthlete } from '../../../helpers/athletes';
import { AllAthletesResponse, Athlete, AthleteResponse } from '../../../interfaces/athlete';
import { FetchOptions } from '../../../interfaces/fetchOptions';
import { getItemsStatus, getItemStatusById } from '../getItemsStatus/getItemsStatus';

const athletesQuery = `
query {
  allAthlete (first: 100) {
    results {
      id
      athleteName
      profilePhoto {
        results {
          id
          name
          fileUrl
          description
        }
      }
      featuredImage {
        results {
          id
          name
          fileUrl
          description
        }
      }
      isFeatured
      sport {
        results {
          ... on Sport {
            id
            title
            description
            featuredImage {
              results {
                id
                fileUrl
              }
            }
          }
        }
      }
      athleteQuote
      nationality
      dateOfBirth
      careerStartDate
      hobby
      relatedMedia {
        results {
          id
          name
          fileUrl
          description
        }
      }
    }
  }
}
`;

export const getAllAthletes = async (options?: FetchOptions): Promise<Athlete[]> => {
  const results: AllAthletesResponse = (await fetchGraphQL(
    athletesQuery,
    options
  )) as AllAthletesResponse;
  const statusResults = await getItemsStatus(STATUS_TYPES.content);

  return results.data.allAthlete.results.map((athlete) =>
    normalizeAthlete(athlete, statusResults)
  ) as Athlete[];
};

const getAthleteByIdQuery = (id: string) => {
  return `
    query {
      athlete (id: "${id}") {
        id
        athleteName
        profilePhoto {
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
        isFeatured
        sport {
          results {
            ... on Sport {
              id
              title
              description
              featuredImage {
                results {
                  id
                  fileUrl
                }
              }
            }
          }
        }
        athleteQuote
        nationality
        dateOfBirth
        careerStartDate
        hobby
        relatedMedia {
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
    }`;
};

export const getAthleteById = async (id: string): Promise<Athlete> => {
  const athleteResponse = (await fetchGraphQL(getAthleteByIdQuery(id))) as {
    data: { athlete: AthleteResponse };
  };
  const statusResult = await getItemStatusById(id, STATUS_TYPES.content);

  return normalizeAthlete(athleteResponse.data.athlete, [statusResult]) as Athlete;
};
