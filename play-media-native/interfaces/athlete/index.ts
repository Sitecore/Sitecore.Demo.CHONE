import { Media } from '../media';
import { Sport } from '../sport';

export interface Athlete {
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
      results: Athlete[];
    };
  };
}

export interface AthleteResponse {
  data: {
    athlete: Athlete;
  };
}
