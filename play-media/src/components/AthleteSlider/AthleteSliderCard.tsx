import Link from 'next/link';
import { ATHLETE_MOCK_IMG } from '../../constants/mockImages';
import slugify from 'slugify';
import { Athlete } from '../../interfaces/athlete';
import { ShadowBox } from '../Common/ShadowBox';

export const AthleteSliderCard = ({ athlete }: { athlete: Athlete }) => {
  return (
    <article className="athlete-slider-card">
      <Link href={`/athlete/${athlete.id}/${slugify(athlete.athleteName, { lower: true })}`}>
        <div className="athlete-slider-card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={athlete?.profilePhoto?.results[0]?.fileUrl || ATHLETE_MOCK_IMG}
            alt={athlete?.profilePhoto?.results[0]?.description}
          />
        </div>
        <ShadowBox
          color={athlete?.sport?.results[0]?.color}
          label="Featured"
          title={athlete?.athleteName}
          body={
            <>
              <span>{athlete?.sport?.results[0].title}</span>
              <span>{athlete?.nationality}</span>
            </>
          }
        />
      </Link>
    </article>
  );
};
