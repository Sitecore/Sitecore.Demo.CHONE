import { Location } from '../../interfaces/location';

const LocationCard = ({ location }: { location: Location }) => {
  return (
    <div className="location-card">
      <h5 className="location-card-title">{location.title}</h5>
      <p>{location.address}</p>
      <p>{location.city}</p>
      <p>{location.country}</p>
      <p>{location.phone}</p>
    </div>
  );
};

export default LocationCard;
