import { Media } from '../media';

export interface SportResponse {
  id: string;
  title: string;
  description: string;
  featuredImage: { results: Media[] };
}

export interface Sport {
  id: string;
  title: string;
  description: string;
  featuredImage: Media;
}

export interface AllSportsResponse {
  data: {
    allSport: {
      results: SportResponse[];
    };
  };
}
