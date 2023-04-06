import { normalizeContentItem } from './contentItemHelper';
import { publishContentItem } from '../api/queries/contentItems';
import { publishMediaItem } from '../api/queries/mediaItems';
import { ATHLETE_FACETS } from '../constants/filters';
import { FIELD_OVERRIDES_SPORT } from '../constants/sport';
import { Athlete, AthleteResponse } from '../interfaces/athlete';
import { Sport } from '../interfaces/sport';
import { StatusResult } from '../interfaces/statusResults';

export const initializeAthletes = (athletes: Athlete[], sports: Sport[]) => {
  if (!athletes || !sports) {
    return [];
  }

  return athletes.map((item) => ({
    ...item,
    [ATHLETE_FACETS.sport]: item.sport?.id || null,
  }));
};

// return only atheltes not already selected in global state
//
export const removeAlreadySelected = (athletes: Athlete[], existingAthletes: Athlete[]) => {
  const existingAthleteIDs = existingAthletes.map((item) => item.id);
  return athletes.filter((athlete) => !existingAthleteIDs.includes(athlete.id));
};

export const normalizeAthlete = (athlete: AthleteResponse, statusResults: StatusResult[]) => {
  const athleteStatus = statusResults.find((item) => item.id === athlete.id)?.status;

  return {
    id: athlete.id,
    athleteName: athlete.athleteName,
    status: athleteStatus,
    sport: athlete.sport?.results.length
      ? normalizeContentItem(athlete.sport?.results[0], FIELD_OVERRIDES_SPORT)
      : null,
    profilePhoto: athlete.profilePhoto?.results[0] || null,
    featuredImage: athlete.featuredImage?.results[0] || null,
    isFeatured: athlete.isFeatured,
    athleteQuote: athlete.athleteQuote,
    nationality: athlete.nationality,
    dateOfBirth: athlete.dateOfBirth,
    careerStartDate: athlete.careerStartDate,
    hobby: athlete.hobby,
    relatedMedia: athlete.relatedMedia?.results || [],
  };
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
