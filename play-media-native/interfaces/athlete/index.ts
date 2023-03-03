import { Media } from '../media';
import { Sport } from '../sport';

export interface AthleteResponse {
  id: string;
  athleteName: string;
  profilePhoto: {
    results: Media[];
  };
  featuredImage: {
    results: Media[];
  };
  isFeatured: boolean;
  sport: {
    results: Sport[];
  };
  athleteQuote: string;
  nationality: string;
  dateOfBirth: Date;
  careerStartDate: Date;
  hobby: string;
  relatedMedia: {
    results: Media[];
  };
}

export interface AllAthletesResponse {
  data: {
    allAthlete: {
      results: AthleteResponse[];
    };
  };
}

export interface Athlete {
  id: string;
  athleteName: string;
  profilePhoto: Media;
  featuredImage: Media;
  isFeatured: boolean;
  sport: Sport;
  athleteQuote: string;
  nationality: string;
  dateOfBirth: Date;
  careerStartDate: Date;
  hobby: string;
  relatedMedia: Media[];
}
