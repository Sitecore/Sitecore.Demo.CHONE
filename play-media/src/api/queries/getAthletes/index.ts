import { fetchGraphQL } from '../..';
import { AllAthletesResponse, Athlete, AthleteResponse } from '../../../interfaces/athlete';

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

export const getAllAthletes = async (): Promise<{ athletes: Partial<Athlete>[] }> => {
  const results: AllAthletesResponse = (await fetchGraphQL(athletesQuery)) as AllAthletesResponse;
  const athletes: Partial<Athlete>[] = [];

  results.data.allAthlete.results.forEach((athlete: Partial<Athlete>) => {
    athletes.push({
      id: athlete.id,
      athleteName: athlete.athleteName,
      profilePhoto: athlete.profilePhoto,
      featuredImage: athlete.featuredImage,
      isFeatured: athlete.isFeatured,
      sport: athlete.sport,
      athleteQuote: athlete.athleteQuote,
      nationality: athlete.nationality,
      dateOfBirth: athlete.dateOfBirth,
      careerStartDate: athlete.careerStartDate,
      hobby: athlete.hobby,
      relatedMedia: athlete.relatedMedia,
    });
  });

  return {
    athletes,
  };
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

export const getAthleteById = async (id: string): Promise<{ athlete: Partial<Athlete> }> => {
  const athleteResponse: AthleteResponse = (await fetchGraphQL(
    getAthleteByIdQuery(id)
  )) as AthleteResponse;

  return {
    athlete: athleteResponse.data.athlete,
  };
};
