import { FIELD_TYPES } from '../constants/contentTypes';
import { MEDIA_SOURCES } from '../constants/media';
import { IFieldOverride } from '../interfaces/contentItem';
import { IIndexable } from '../interfaces/indexable';
import { Media, MediaToUpload } from '../interfaces/media';

const afterExtensionRegex = /\.[0-9a-z]+$/i;

const getFileTypeFromURL = (url: string) => {
  try {
    const fileExtension = url.match(afterExtensionRegex)[0].replace('.', '');
    return `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;
  } catch {
    return '---';
  }
};

export const getFileType = (image: any) => {
  if (image.fileType) {
    return image.fileType;
  }

  return getFileTypeFromURL(image.uri);
};

export const removeFileExtension = (text: string) => {
  if (text.includes('.')) {
    return text.substring(0, text.lastIndexOf('.'));
  }

  return text;
};

// return only media not already selected in global state
//
export const removeAlreadySelected = (media: Media[], existingMedia: Media[] | Media) => {
  if (!existingMedia) {
    return media;
  }

  if (!Array.isArray(existingMedia)) {
    return media.filter((item) => item.id !== existingMedia.id);
  }

  const existingMediaIDs = existingMedia.map((item) => item.id);
  return media.filter((item) => !existingMediaIDs.includes(item.id));
};

// Get only the media fields from a content item
//
const getMediaFields = (contentItem: IIndexable, overrides: Record<string, IFieldOverride>) => {
  return Object.keys(contentItem).filter(
    (fieldKey) => overrides[fieldKey]?.type === FIELD_TYPES.Media
  );
};

// Get an array of only the media items added from library/camera from content item state
//
export const getDeviceImages = (
  contentItem: IIndexable,
  overrides: Record<string, IFieldOverride>
): MediaToUpload[] => {
  const mediaFieldKeys = getMediaFields(contentItem, overrides);
  const deviceMedia = [];

  mediaFieldKeys.forEach((fieldKey) => {
    const fieldMediaArray = Array.isArray(contentItem[fieldKey])
      ? contentItem[fieldKey].map((item: Media) => ({
          ...item,
          stateField: fieldKey,
          stateId: item?.id,
        }))
      : [
          {
            ...contentItem[fieldKey],
            stateField: fieldKey,
            stateId: contentItem[fieldKey]?.id,
          },
        ].filter((item) => item); // remove falsy values

    deviceMedia.push(
      ...fieldMediaArray.filter(
        (item: MediaToUpload) =>
          item?.source === MEDIA_SOURCES.LIBRARY || item?.source === MEDIA_SOURCES.CAMERA
      )
    );
  });

  return deviceMedia;
};

// After media items are created in CH ONE, replace their previous values in global state
//
export const insertCreatedMedia = (
  contentItem: IIndexable,
  createdMedia: MediaToUpload[]
): IIndexable => {
  const updatedState = {};

  createdMedia.forEach((media) => {
    updatedState[media.stateField] = Array.isArray(contentItem[media.stateField])
      ? contentItem[media.stateField].map((stateItem: Media) =>
          stateItem.id === media.stateId ? { ...stateItem, ...media } : stateItem
        )
      : { ...contentItem[media.stateField], ...media };
  });

  return updatedState;
};
