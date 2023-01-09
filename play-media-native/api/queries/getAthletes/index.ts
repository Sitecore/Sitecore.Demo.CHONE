import { FetchOptions, fetchGraphQL } from "../..";
import { AllAthletesResponse, Athlete } from "../../../interfaces/athlete";

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
            color
          }
        }
      }
      athleteQuote
      nationality
      birthDate
      careerStart
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

export const getAllAthletes = async (
  options: FetchOptions
): Promise<Athlete[]> => {
  const results: AllAthletesResponse = (await fetchGraphQL(
    athletesQuery,
    options
  )) as AllAthletesResponse;
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
      birthDate: athlete.birthDate,
      careerStart: athlete.careerStart,
      hobby: athlete.hobby,
      relatedMedia: athlete.relatedMedia,
    });
  });

  return athletes as Athlete[];
};
