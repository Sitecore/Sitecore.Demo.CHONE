import { Dimensions, Platform } from 'react-native';

import { fetchGraphQL } from '../..';
import { STATUS_TYPES } from '../../../constants/status';
import { normalizeEvent } from '../../../helpers/events';
import { Event, AllEventsResponse, EventResponse } from '../../../interfaces/event';
import { FetchOptions } from '../../../interfaces/fetchOptions';
import { getItemsStatus } from '../getItemsStatus/getItemsStatus';

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
          }
        }
      }
      timeAndDate
      location
      featuredImage {
        results {
          id
          description
          fileHeight
          fileSize
          fileType
          fileUrl (
            transform: {
              width: ${Math.ceil((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').width)},
              height: ${Math.ceil(
                ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').height) / 2
              )},
              fit: SCALEDOWN
            }
          ),
          fileWidth
          name
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
  const statusResults = await getItemsStatus(STATUS_TYPES.content);
  return results.data.allEvent.results.map((event: Partial<EventResponse>) =>
    normalizeEvent(event as EventResponse, statusResults)
  );
};

const getEventByIdQuery = (id: string) => {
  return `
    query {
      event (id: "${id}") {
        id
        name
        title
        sport {
          results {
            ... on Sport {
              id
              title
              description
              featuredImage {
                results {
                  id
                  fileUrl (
                    transform: {
                      width: ${Math.ceil(
                        (Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').width
                      )},
                      height: ${Math.ceil(
                        ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').height) / 3
                      )},
                      fit: SCALEDOWN
                    }
                  ),
                }
              }
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
            fileUrl (
              transform: {
                width: ${Math.ceil(
                  (Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').width
                )},
                height: ${Math.ceil(
                  ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').height) / 2
                )},
                fit: SCALEDOWN
              }
            ),
            description
            fileHeight
            fileSize
            fileType
            fileWidth
          }
        }
        relatedMedia {
          results {
            id
            name
            fileUrl (
              transform: {
                width: ${Math.ceil(
                  ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').width * 2) / 3
                )},
                height: ${Math.ceil(
                  ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').height) / 2
                )},
                fit: SCALEDOWN
              }
            ),
            description
            fileHeight
            fileSize
            fileType
            fileWidth
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
                  fileUrl (
                    transform: {
                      width: ${Math.ceil(
                        ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').width) / 3
                      )},
                      height: ${Math.ceil(
                        ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').height) / 5
                      )},
                      fit: SCALEDOWN
                    }
                  ),
                  description
                }
              }
              sport {
                results {
                  ... on Sport {
                    id
                    title
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
                  }
                }
              }
              location
              timeAndDate
              featuredImage {
                results {
                  id
                  name
                  fileUrl (
                    transform: {
                      width: ${Math.ceil(
                        (Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').width
                      )},
                      height: ${Math.ceil(
                        ((Platform.OS === 'ios' ? 3 : 1) * Dimensions.get('window').height) / 2
                      )},
                      fit: SCALEDOWN
                    }
                  ),
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
    const eventResponse: { data: { event: EventResponse } } = (await fetchGraphQL(
      getEventByIdQuery(id)
    )) as {
      data: { event: EventResponse };
    };
    const statusResults = await getItemsStatus(STATUS_TYPES.content);

    return normalizeEvent(eventResponse.data.event, statusResults);
  } catch {
    return null;
  }
};
