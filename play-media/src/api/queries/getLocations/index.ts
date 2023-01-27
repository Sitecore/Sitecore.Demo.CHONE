import { fetchGraphQL } from '../..';
import { AllLocationResponse, Location } from '../../../interfaces/location';

const locationsQuery = `
  query {
    allLocation {
      results {
        id
        title
        address
        city
        country
        phone
      }
    }
  }
`;

export const getAllLocations = async (): Promise<Partial<Location>[] | null> => {
  try {
    const results: AllLocationResponse = (await fetchGraphQL(
      locationsQuery
    )) as AllLocationResponse;
    const locations: Partial<Location>[] = [];

    results.data.allLocation.results.forEach((location: Partial<Location>) => {
      locations.push({
        id: location.id,
        title: location.title,
        address: location.address,
        city: location.city,
        country: location.country,
        phone: location.phone,
      });
    });

    return locations;
  } catch {
    return null;
  }
};
