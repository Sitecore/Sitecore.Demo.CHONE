import { Media } from '../media';
import { Sport } from '../sport';

export interface Athlete {
  id: string;
  athleteName: string;
  profilePhoto: {
    results: Partial<Media>[];
  };
  featuredImage: {
    results: Partial<Media>[];
  };
  isFeatured: boolean;
  sport: {
    results: Partial<Sport>[];
  };
  athleteQuote: string;
  nationality: string;
  birthDate: string;
  careerStart: string;
  hobby: string;
  relatedMedia: {
    results: Partial<Media>[];
  };
}

export interface AllAthletesResponse {
  data: {
    allAthlete: {
      results: Partial<Athlete>[];
    };
  };
}
