import { Athlete } from '../athlete';
import { Sport } from '../sport';
import { Media } from '../media';

export interface Event {
  id: string;
  title: string;
  slug: string;
  sport: {
    results: Partial<Sport>[];
  };
  isFeatured: boolean;
  timeAndDate: Date;
  location: string;
  featuredImage: {
    results: Partial<Media>[];
  };
  relatedMedia: {
    results: Partial<Media>[];
  };
  teaser: string;
  body: unknown;
  athletes: {
    results: Partial<Athlete>[];
  };
  similarEvents: {
    results: Partial<Event>[];
  };
}

export interface AllEventsResponse {
  data: {
    allEvent: {
      results: Partial<Event>[];
    };
  };
}
