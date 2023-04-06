import { fetchGraphQL } from '../..';
import { Event, AllEventsResponse, EventResponse } from '../../../interfaces/event';

const eventsQuery = `
query {
  allEvent (where: {
    OR: [
          {title_contains: "Hike"}
          {title_contains:"CHALLENGE"}
         ]
        }) {
    total
    results {
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
}
`;

export const getAllEventsBySport = async (): Promise<Partial<Event>[] | null> => {
  try {
    const results: AllEventsResponse = (await fetchGraphQL(eventsQuery)) as AllEventsResponse;
    const events: Partial<Event>[] = [];

    results.data.allEvent.results.forEach((event: Partial<Event>) => {
      events.push({
        id: event.id,
        title: event.title,
        sport: event.sport,
        isFeatured: event.isFeatured,
        timeAndDate: event.timeAndDate,
        location: event.location,
        featuredImage: event.featuredImage,
        relatedMedia: event.relatedMedia,
        teaser: event.teaser,
        body: event.body,
        athletes: event.athletes,
        similarEvents: event.similarEvents,
      });
    });

    return events;
  } catch {
    return null;
  }
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

export const getEventById = async (id: string): Promise<Partial<Event> | null> => {
  try {
    const eventResponse: EventResponse = (await fetchGraphQL(
      getEventByIdQuery(id)
    )) as EventResponse;

    return eventResponse.data.event;
  } catch {
    return null;
  }
};
