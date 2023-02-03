import { useMemo, useState } from 'react';
import { camelize } from '../../helpers/textHelper';
import { Athlete } from '../../interfaces/athlete';
import { Sport } from '../../interfaces/sport';
import { AthleteGrid } from '../AthleteGrid/AthleteGrid';
import { AthleteSlider } from '../AthleteSlider/AthleteSlider';
import { FacetFilters } from '../FacetFilters/FacetFilters';
import { HeroBannerSection } from '../HeroBanner/HeroBannerSection';

export interface IIndexable {
  [key: string]: any;
}

export const AthleteListingPage = ({
  athletes,
  sports,
}: {
  athletes: Athlete[];
  sports: Sport[];
}) => {
  const [facetValues, setFacetValues] = useState<IIndexable>({
    athleteNationality: '',
    athleteSport: '',
  });

  const featuredAthletes = useMemo(
    () => athletes.filter((athlete) => athlete.isFeatured),
    [athletes]
  );

  const randomFeaturedImage = useMemo(() => {
    const allFeaturedImages = athletes
      .map((athlete) => athlete.featuredImage.results.map((img) => img.fileUrl))
      .flat();

    return allFeaturedImages[Math.floor(Math.random() * allFeaturedImages.length)];
  }, [athletes]);

  const nationalityFacets = useMemo(() => {
    const nationalities = Array.from(
      new Set(athletes.map((athlete) => athlete.nationality).filter((n) => n))
    );

    return nationalities.map((nationality) => ({
      name: nationality,
      id: camelize(nationality),
    }));
  }, [athletes]);

  const sportFacets = useMemo(() => {
    return sports.map((sport) => ({ name: sport.title, id: sport.id }));
  }, [sports]);

  const filteredAthletes = useMemo(() => {
    let filteredAthletes = athletes;
    if (!!facetValues.athleteNationality) {
      filteredAthletes = filteredAthletes.filter((athlete) => {
        return camelize(athlete.nationality) === facetValues.athleteNationality;
      });
    }
    if (!!facetValues.athleteSport) {
      filteredAthletes = filteredAthletes.filter((athlete) => {
        return athlete.sport.results[0]?.id === facetValues.athleteSport;
      });
    }
    return filteredAthletes;
  }, [facetValues, athletes]);

  const handleFacetsChange = (id: string, value: string) => {
    const newFacetValues = facetValues;
    newFacetValues[id] = value;

    setFacetValues({ ...newFacetValues });
  };

  return (
    <>
      <HeroBannerSection
        title="Athletes"
        body={
          <p>
            Get to know all the athletes from the <b>PLAY!</b>Media. Get insight into their facts,
            statistics, success stories, recent results and more!
          </p>
        }
        imageSrc="./tourists-go-up-hill-sunrise.webp"
      >
        <AthleteSlider athletes={featuredAthletes} />
      </HeroBannerSection>
      <div className="container">
        <FacetFilters
          facetFilters={[
            {
              id: 'athleteNationality',
              label: 'Nationality',
              facets: nationalityFacets,
            },
            {
              id: 'athleteSport',
              label: 'Sport',
              facets: sportFacets,
            },
          ]}
          onChange={handleFacetsChange}
        />
      </div>
      <AthleteGrid athletes={filteredAthletes} className="min-h-screen" />
    </>
  );
};
