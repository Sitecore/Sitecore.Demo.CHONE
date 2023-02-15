import { fetchGraphQL } from '../..';
import { normalizeEvent } from '../../../helpers/events';
import { Event, AllEventsResponse, EventResponse } from '../../../interfaces/event';
import { FetchOptions } from '../../../interfaces/fetchOptions';

const eventsQuery = `
query {
  allEvent (first: 100) {
    total
    results {
      id
      name
      title
      sport {
        results {
          ... on Sport {
           	id
            title
            description
          }
        }
      }
      isFeatured
      timeAndDate
      location
      featuredImage {
        results {
          id
          description
          fileHeight
          fileSize
          fileType
          fileUrl
          fileWidth
          name
        }
      }
      relatedMedia {
        results {
          id
          description
          fileHeight
          fileSize
          fileType
          fileUrl
          fileWidth
          name
        }
      }
      teaser
      body
      athletes {
        results {
          ... on Athlete {
            id
            athleteName
            athleteQuote
            dateOfBirth
            nationality
            profilePhoto {
              results {
                id
                name
                fileUrl
                description
              }
            }
            sport {
              results {
                ... on Sport {
                  id
                  title
                  description
                }
              }
            }
          }
        }
      }
      similarEvents {
        results {
          ... on Event {
            id
            name
            location
            title
            sport {
              results {
                ... on Sport {
                  id
                  title
                  description
                }
              }
            }
            timeAndDate
            featuredImage {
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
    }
  }
}
`;

export const getAllEvents = async (options?: FetchOptions): Promise<Event[]> => {
  const results: AllEventsResponse = (await fetchGraphQL(
    eventsQuery,
    options
  )) as AllEventsResponse;
  return results.data.allEvent.results.map((event: Partial<EventResponse>) =>
    normalizeEvent(event as EventResponse)
  );
};

const getEventByIdQuery = (id: string) => {
  return `
    query {
      event (id: "${id}") {
        id
        title
        sport {
          results {
            ... on Sport {
              id
              title
              description
            }
          }
        }
        isFeatured
        timeAndDate
        location
        featuredImage {
          results {
            id
            name
            fileUrl
            description
          }
        }
        relatedMedia {
          results {
            id
            name
            fileUrl
            description
          }
        }
        teaser
        body
        athletes {
          results {
            ... on Athlete {
              id
              athleteName
              athleteQuote
              dateOfBirth
              nationality
              profilePhoto {
                results {
                  id
                  name
                  fileUrl
                  description
                }
              }
              sport {
                results {
                  ... on Sport {
                    id
                    title
                    description
                  }
                }
              }
            }
          }
        }
        similarEvents {
          results {
            ... on Event {
              id
              title
              sport {
                results {
                  ... on Sport {
                    id
                    title
                    description
                  }
                }
              }
              timeAndDate
              featuredImage {
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
      }
    }
    `;
};

export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const eventResponse: { data: { event: EventResponse } } =
      (await fetchGraphQL(getEventByIdQuery(id))) as {
        data: { event: EventResponse };
      };

    return normalizeEvent(eventResponse.data.event);
  } catch {
    return null;
  }
};
