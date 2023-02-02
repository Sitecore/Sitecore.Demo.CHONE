import Link from 'next/link';
import { ATHLETE_MOCK_IMG } from '../../constants/mockImages';
import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { slugify } from '../../helpers/slugHelper';
import { Athlete } from '../../interfaces/athlete';
import { ShadowBox } from '../Common/ShadowBox';

export const AthleteCard = ({ athlete }: { athlete: Athlete }) => {
  const accentColor = getAccentColor(athlete?.sport?.results[0]?.title);
  const style = accentColor ? { backgroundColor: `${accentColor}` } : {};

  return (
    <article className="athlete-card">
      <Link href={`/athlete/${athlete.id}/${slugify(athlete.athleteName)}`}>
        <ShadowBox color={accentColor}>
          <div className="athlete-card-content">
            <div className="athlete-card-image" style={{ borderColor: accentColor }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={athlete?.profilePhoto?.results[0]?.fileUrl || ATHLETE_MOCK_IMG}
                alt={athlete?.profilePhoto?.results[0]?.description}
              />
            </div>
            <div className="athlete-card-profile">
              <blockquote style={style} className={getTextColor(accentColor)}>
                {athlete?.athleteQuote}
              </blockquote>
              <h3>{athlete?.athleteName}</h3>
            </div>
            <div className="athlete-card-data">
              <span className={`athlete-card-label ${getTextColor(accentColor)}`} style={style}>
                {/* TODO: remove 'Sport' after data is finalized */}
                {athlete?.sport?.results[0]?.title || 'Sport'}
              </span>
              <span className="athlete-card-nationality">{athlete?.nationality}</span>
            </div>
          </div>
        </ShadowBox>
      </Link>
    </article>
  );
};
