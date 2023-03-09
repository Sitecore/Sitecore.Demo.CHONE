import { FileSystemSessionType, FileSystemUploadType, uploadAsync } from 'expo-file-system';

import { MediaToUpload } from '../../../interfaces/media';
import { generateToken } from '../generateToken';

const API_URL = 'https://content-api.sitecorecloud.io';
const GENERATE_LINK_URL = 'https://mms-upload.sitecorecloud.io';

const STATUS_ERROR = 'error';
const STATUS_SUCCESS = 'success';

const shouldContinueUpload = (image: MediaToUpload) => {
  if (image?.uploadStatus === STATUS_ERROR) {
    return false;
  }

  return true;
};

const updateErrorStatus = (image: MediaToUpload) => {
  return {
    ...image,
    uploadStatus: STATUS_ERROR,
  };
};

const generateUploadLink = async (image: MediaToUpload): Promise<MediaToUpload> => {
  const accessToken: string = (await generateToken()).access_token;

  return await fetch(`${GENERATE_LINK_URL}/api/media/v1/upload/link/generate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-mms-content-type': image.fileType,
      'x-mms-content-length': image.fileSize,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName: image.name }),
  })
    .then(async (response: Response) => {
      const uploadLinkData = await response.json();
      return {
        ...image,
        link: uploadLinkData?.link,
        fileId: uploadLinkData?.fileId,
      };
    })
    .catch((e) => {
      console.error('\nError in generateUploadLink', e);
      return updateErrorStatus(image);
    });
};

const uploadBinary = async (image: MediaToUpload): Promise<MediaToUpload> => {
  return await uploadAsync(image.link, image.fileUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    httpMethod: 'PUT',
    sessionType: FileSystemSessionType.BACKGROUND,
    uploadType: FileSystemUploadType.BINARY_CONTENT,
  })
    .then(() => {
      return image;
    })
    .catch((e) => {
      console.error('\nError in uploadBinary', e);
      return updateErrorStatus(image);
    });
};

const completeUpload = async (image: MediaToUpload): Promise<MediaToUpload> => {
  const accessToken: string = (await generateToken()).access_token;

  return await fetch(`${GENERATE_LINK_URL}/api/media/v1/upload/link/complete`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-mms-content-type': image.fileType,
      'x-mms-content-length': image.fileSize,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId: image.fileId }),
  })
    .then(() => {
      return image;
    })
    .catch((e) => {
      console.error('\nError in completeUpload', e);
      return updateErrorStatus(image);
    });
};

const createMediaItem = async (image: MediaToUpload): Promise<MediaToUpload> => {
  const accessToken: string = (await generateToken()).access_token;

  return await fetch(`${API_URL}/api/content/v1/media`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: image.name,
      description: image.description,
      fileId: image.fileId,
    }),
  })
    .then(async (response: Response) => {
      const mediaItem = await response.json();
      return {
        ...image,
        ...mediaItem,
      };
    })
    .catch((e) => {
      console.error('\nError in generateUploadLink', e);
      return updateErrorStatus(image);
    });
};

export const uploadSingleImage = async (image: MediaToUpload) => {
  const fileExtension = image.fileType.substring(image.fileType.indexOf('/') + 1);
  const name = `${image.name}.${fileExtension}`;

  // uploadStatus initally set to STATUS_SUCCESS
  // on any error, it will be changed to STATUS_ERROR
  //
  let output = { ...image, name, uploadStatus: STATUS_SUCCESS };

  output = shouldContinueUpload(output) ? await generateUploadLink(output) : output;
  output = shouldContinueUpload(output) ? await uploadBinary(output) : output;
  output = shouldContinueUpload(output) ? await completeUpload(output) : output;
  output = shouldContinueUpload(output) ? await createMediaItem(output) : output;

  return output;
};

export const uploadMultipleImages = async (images: MediaToUpload[]) => {
  return await Promise.all(images.map((image) => uploadSingleImage(image)))
    .then((mediaItems) => {
      return images.map((image, index) => ({ ...image, ...mediaItems[index] }));
    })
    .catch(() => {
      throw Error('Error on media batch upload');
    });
};
