import { publishContentItem } from '../api/queries/contentItems';
import { publishMediaItem } from '../api/queries/mediaItems';
import { ATHLETE_FACETS } from '../constants/filters';
import { Athlete } from '../interfaces/athlete';
import { Sport } from '../interfaces/sport';

export const initializeAthletes = (athletes: Athlete[], sports: Sport[]) => {
  if (!athletes || !sports) {
    return [];
  }

  return athletes.map((item) => ({
    ...item,
    [ATHLETE_FACETS.sport]: item?.sport?.results?.length ? item.sport.results[0]?.id : null,
  }));
};

// return only atheltes not already selected in global state
//
export const removeAlreadySelected = (athletes: Athlete[], existingAthletes: Athlete[]) => {
  const existingAthleteIDs = existingAthletes.map((item) => item.id);
  return athletes.filter((athlete) => !existingAthleteIDs.includes(athlete.id));
};

// Helper function to iterate over an athlete and publish all related media
// (profilePhoto, featuredImage, relatedMedia) and the athlete object
export const publishAthlete = async (athlete: Athlete): Promise<unknown> => {
  // If the athlete has a profile photo and/ or a featured image and/ or related media create a promise for each one of them
  const mediaPromises = [];
  if (athlete?.profilePhoto?.id) {
    mediaPromises.push(() => publishMediaItem(athlete.profilePhoto.id));
  }
  if (athlete?.featuredImage?.id) {
    mediaPromises.push(() => publishMediaItem(athlete.featuredImage.id));
  }
  if (athlete?.relatedMedia?.length > 0) {
    for (const mediaItem of athlete.relatedMedia) {
      if (mediaItem?.id) {
        mediaPromises.push(() => publishMediaItem(mediaItem.id));
      }
    }
  }

  // Run all of the above promises in parallel along with the one for publishing the athlete
  return await Promise.all([
    ...mediaPromises.map((mediaPromise) => mediaPromise()),
    publishContentItem(athlete.id),
  ]);
};
