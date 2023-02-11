import { Athlete } from "../athlete";
import { Sport } from "../sport";
import { Media } from "../media";

export interface EventResponse {
  id: string;
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
    results: Athlete[];
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
