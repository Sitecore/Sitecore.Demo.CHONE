import { getDate, getYear } from '../../helpers/dateHelper';
import { Athlete } from '../../interfaces/athlete';
import { Event } from '../../interfaces/event';
import { ShadowBox } from '../Common/ShadowBox';
import { EventGridSimple } from '../EventGrid/EventGridSimple';
import { HeroBannerAthleteDetails } from '../HeroBanner/HeroBannerAthleteDetails';
import ImageGrid from '../ImageGrid/ImageGrid';

export const AthleteDetailsPage = ({
  athlete,
  athleteEvents,
}: {
  athlete: Athlete;
  athleteEvents: Event[];
}) => {
  return (
    <>
      <HeroBannerAthleteDetails athlete={athlete} />
      <section className="container content-section athlete-info">
        <article>
          <ShadowBox color={athlete?.sport?.results[0]?.color}>
            <div>
              <span>Date of birth</span>
              <h3>{getDate(athlete?.dateOfBirth)}</h3>
              <span>Career start</span>
              <h3>{getYear(athlete?.careerStartDate)}</h3>
            </div>
            <div>
              <span>Nationality</span>
              <h3>{athlete?.nationality}</h3>
              <span>Hobby</span>
              <h3>{athlete?.hobby}</h3>
            </div>
          </ShadowBox>
        </article>
        <ImageGrid images={athlete?.relatedMedia?.results}></ImageGrid>
      </section>
      <section>
        <h3 className="events-title">Events</h3>
        <EventGridSimple events={athleteEvents}></EventGridSimple>
      </section>
    </>
  );
};
