import { Athlete } from "../athlete";
import { Sport } from "../sport";
import { Media } from "../media";

export interface EventResponse {
  id: string;
  name: string;
  title: string;
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
  body: any;
  athletes: {
    results: Partial<Athlete>[];
  };
  similarEvents: {
    results: Partial<EventResponse>[];
  };
}

export interface AllEventsResponse {
  data: {
    allEvent: {
      results: Partial<EventResponse>[];
    };
  };
}

export interface Event {
  id: string;
  name: string;
  title: string;
  sport: Partial<Sport>;
  isFeatured: boolean;
  timeAndDate: Date;
  location: string;
  featuredImage: Partial<Media>;
  relatedMedia: Partial<Media>[];
  teaser: string;
  body: any;
  athletes: Partial<Athlete>[];
  similarEvents: Partial<Event>[];
}
