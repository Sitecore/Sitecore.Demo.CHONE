import { RichText } from '../../components/RichText/RichText';
import { EventGridSimple } from '../../components/EventGrid/EventGridSimple';
import { HeroBannerEventDetails } from '../../components/HeroBanner/HeroBannerEventDetails';
import ImageGrid from '../../components/ImageGrid/ImageGrid';
import { Event } from '../../interfaces/event';
import { AthleteGrid } from '../../components/AthleteGrid/AthleteGrid';

const EventDetailsPage = ({ event }: { event: Event }) => {
  return (
    <main>
      <HeroBannerEventDetails event={event} />
      <div className="container content-section event-detail-content">
        {!!event?.relatedMedia?.results?.length && (
          <ImageGrid images={event?.relatedMedia?.results || []} />
        )}
        <RichText body={event?.body?.content} />
      </div>
      {!!event?.athletes?.results && (
        <section>
          <h2 className="text-center -mb-10">Athletes who joined</h2>
          <AthleteGrid athletes={event?.athletes?.results} />
        </section>
      )}
      {!!event?.similarEvents?.results?.length && (
        <section>
          <h2 className="text-center mb-10">Similar events</h2>
          <EventGridSimple events={event?.similarEvents?.results as Event[]} />
        </section>
      )}
    </main>
  );
};

export default EventDetailsPage;
