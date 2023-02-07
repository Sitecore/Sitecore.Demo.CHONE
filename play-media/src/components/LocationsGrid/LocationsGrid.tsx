import { Location } from '../../interfaces/location';
import LocationCard from './LocationCard';

const LocationsGrid = ({ locations }: { locations: Location[] }) => {
  return (
    <div className="locations-grid container">
      {locations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationsGrid;
