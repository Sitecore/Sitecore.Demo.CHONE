import { ContentBlock as IContentBlock } from '../../interfaces/contentBlock';
import { Location } from '../../interfaces/location';
import ContentBlock from '../ContentBlock/ContentBlock';
import { HeroBannerSection } from '../HeroBanner/HeroBannerSection';
import LocationsGrid from '../LocationsGrid/LocationsGrid';

export const AboutUsPage = ({
  contentBlocks,
  locations,
}: {
  contentBlocks: IContentBlock[];
  locations: Location[];
}) => {
  // DEMO SCENARIO CUSTOMIZATION:
  // Change these to the respective content ids in your instance
  const CONTENT_IDS = {
    ABOUT: 'YXcFXM4yp0aKvHu5S8tmOg',
    HISTORY: 'o-IjG5JYuE6JNUVx1KejPA',
    LOCATIONS: 'cSaltKGqXESGBDpQvIzlBA',
  };

  const IMG_SRC =
    'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/def8e638-4288-4482-51e5-08dad8591109/5a960059eed9440eb3c892738eef4ab1';

  const getContentBlock = (id: string) => {
    return contentBlocks.find((block) => block.id === id);
  };

  return (
    <>
      <HeroBannerSection imageSrc={IMG_SRC}>
        <ContentBlock contentBlock={getContentBlock(CONTENT_IDS.ABOUT)} />
      </HeroBannerSection>
      <section className="content-section">
        <ContentBlock contentBlock={getContentBlock(CONTENT_IDS.HISTORY)} />
      </section>
      <section className="content-section">
        <ContentBlock contentBlock={getContentBlock(CONTENT_IDS.LOCATIONS)} />
        <LocationsGrid locations={locations} />
      </section>
    </>
  );
};
