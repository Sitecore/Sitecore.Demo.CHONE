import { ContentBlock as IContentBlock } from '../../interfaces/contentBlock';
import { Location } from '../../interfaces/location';
import ContentBlock from '../ContentBlock/ContentBlock';
import { HeroBannerSection } from '../HeroBanner/HeroBannerSection';
import LocationsGrid from '../LocationsGrid/LocationsGrid';

export const AboutUsPage = ({
  contentBlockAbout,
  contentBlockHistory,
  contentBlockLocations,
  locations,
}: {
  contentBlockAbout: IContentBlock;
  contentBlockHistory: IContentBlock;
  contentBlockLocations: IContentBlock;
  locations: Location[];
}) => {
  const IMG_SRC =
    'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/def8e638-4288-4482-51e5-08dad8591109/5a960059eed9440eb3c892738eef4ab1';

  return (
    <>
      <HeroBannerSection imageSrc={IMG_SRC}>
        <ContentBlock contentBlock={contentBlockAbout} />
      </HeroBannerSection>
      <section className="content-section">
        <ContentBlock contentBlock={contentBlockHistory} />
      </section>
      <section className="content-section">
        <ContentBlock contentBlock={contentBlockLocations} />
        <LocationsGrid locations={locations} />
      </section>
    </>
  );
};
