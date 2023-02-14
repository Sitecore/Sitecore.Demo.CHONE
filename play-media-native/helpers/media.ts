import { Media } from '../interfaces/media';

const afterExtensionRegex = /\.[0-9a-z]+$/i;

export const getFileTypeFromURL = (url: string) => {
  try {
    return `image/${url.match(afterExtensionRegex)[0].replace('.', '')}`;
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

// return only atheltes not already selected in global state
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
