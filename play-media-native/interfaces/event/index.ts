import { Athlete, AthleteResponse } from '../athlete';
import { Media } from '../media';
import { Sport } from '../sport';

export interface EventResponse {
  id: string;
  name: string;
  title: string;
  sport: {
    results: Sport[];
  };
  isFeatured: boolean;
  timeAndDate: Date;
  location: string;
  featuredImage: {
    results: Media[];
  };
  relatedMedia: {
    results: Media[];
  };
  teaser: string;
  body: any;
  athletes: {
    results: AthleteResponse[];
  };
  similarEvents: {
    results: EventResponse[];
  };
}

export interface AllEventsResponse {
  data: {
    allEvent: {
      results: EventResponse[];
    };
  };
}

export interface Event {
  id: string;
  name: string;
  status: string;
  title: string;
  sport: Sport;
  isFeatured: boolean;
  timeAndDate: Date;
  location: string;
  featuredImage: Media;
  relatedMedia: Media[];
  teaser: string;
  body: any;
  athletes: Athlete[];
  similarEvents: Event[];
}
