import { fetchGraphQL } from '../..';
import { FIELD_OVERRIDES_ATHLETE } from '../../../constants/athlete';
import { normalizeContentItem } from '../../../helpers/contentItemHelper';
import { AllAthletesResponse, Athlete, AthleteResponse } from '../../../interfaces/athlete';
import { FetchOptions } from '../../../interfaces/fetchOptions';

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
  return results.data.allAthlete.results.map((item) =>
    normalizeContentItem(item, FIELD_OVERRIDES_ATHLETE)
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
    }`;
};

export const getAthleteById = async (id: string): Promise<Athlete> => {
  const athleteResponse = (await fetchGraphQL(getAthleteByIdQuery(id))) as {
    data: { athlete: AthleteResponse };
  };

  return normalizeContentItem(athleteResponse.data.athlete, FIELD_OVERRIDES_ATHLETE) as Athlete;
};
