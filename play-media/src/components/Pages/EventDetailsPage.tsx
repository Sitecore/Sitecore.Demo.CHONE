import { RichText } from '../../components/RichText/RichText';
import { EventGridSimple } from '../../components/EventGrid/EventGridSimple';
import { HeroBannerEventDetails } from '../../components/HeroBanner/HeroBannerEventDetails';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import { Event } from '../../interfaces/event';
import { AthleteGrid } from '../../components/AthleteGrid/AthleteGrid';
import MapboxMap from "../../components/mapbox/Mapbox";
import Image from 'next/image';
import { getSlideImageSize } from '../../helpers/imageHelper';

const EventDetailsPage = ({ event }: { event: Event }) => {

  return (
    <main>
      <HeroBannerEventDetails event={event} />
      <div className="container content-section event-detail-content">
        {!!event?.relatedMedia?.results?.length && (
          <ImageGrid images={event?.relatedMedia?.results || []} />
        )}
        <RichText body={event.body.content} />
      </div>

      {!!event?.similarEvents?.results?.length && (
        <section>
          <h2 className="text-center mb-10">Recommended Adventures</h2>
          <EventGridSimple events={event.similarEvents.results as Event[]} />
        </section>
      )}
      {!!event?.athletes?.results && (
        <section>

          <div className="imageContainer">
            <Image
            className="image"
              layout="fill"
              src='/map.png'
              alt={'map'}
            />

          </div>
        </section>
      )}
    </main>
  );
};

export default EventDetailsPage;
