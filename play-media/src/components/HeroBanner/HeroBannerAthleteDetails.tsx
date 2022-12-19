import { ATHLETE_MOCK_IMG, EVENT_MOCK_IMG } from '../../constants/mockImages';
import { getTextColor } from '../../helpers/textColorHelper';
import { Athlete } from '../../interfaces/athlete';
import { ShadowBox } from '../Common/ShadowBox';
import { HeroBanner } from './HeroBanner';

export const HeroBannerAthleteDetails = ({ athlete }: { athlete: Athlete }) => {
  return (
    <HeroBanner
      imageSrc={athlete?.featuredImage?.results[0]?.fileUrl || EVENT_MOCK_IMG}
      className="hero-banner-athlete-details"
    >
      <div className="avatar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={athlete?.profilePhoto?.results[0]?.fileUrl || ATHLETE_MOCK_IMG}
          alt={athlete?.profilePhoto?.results[0]?.description}
        />
      </div>
      <div className="quote-and-name">
        <ShadowBox color={athlete?.sport?.results[0]?.color} isInverted>
          <blockquote className={getTextColor(athlete?.sport?.results[0]?.color)}>
            {athlete?.athleteQuote}
          </blockquote>
        </ShadowBox>
        <h3>{athlete?.athleteName}</h3>
      </div>
    </HeroBanner>
  );
};
