import { uploadAsync } from 'expo-file-system';

import { Media } from '../../../interfaces/media';
import { generateToken } from '../generateToken';

const API_URL = 'https://content-api.sitecorecloud.io';
const GENERATE_LINK_URL = 'https://mms-upload.sitecorecloud.io';

const generateUploadLink = async ({
  fileName,
  fileType,
  fileSize,
}: {
  fileName: string;
  fileType: string;
  fileSize: string;
}): Promise<{ link: string; fileId: string }> => {
  const accessToken: string = (await generateToken()).access_token;

  return await fetch(`${GENERATE_LINK_URL}/api/media/v1/upload/link/generate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-mms-content-type': fileType,
      'x-mms-content-length': fileSize,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName }),
  })
    .then(async (response: Response) => {
      return await response.json();
    })
    .catch((e) => {
      console.error('\nError in generateUploadLink', e);
      throw e;
    });
};

const uploadBinary = async (uploadLink: string, fileUrl: string) => {
  return await uploadAsync(uploadLink, fileUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    httpMethod: 'PUT',
  })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error('\nError in uploadBinary', e);
      throw e;
    });
};

const completeUpload = async (
  fileId: string,
  {
    fileType,
    fileSize,
  }: {
    fileType: string;
    fileSize: string;
  }
): Promise<{ link: string; fileId: string }> => {
  const accessToken: string = (await generateToken()).access_token;

  return await fetch(`${GENERATE_LINK_URL}/api/media/v1/upload/link/complete`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-mms-content-type': fileType,
      'x-mms-content-length': fileSize,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileId }),
  })
    .then(async (response: Response) => {
      return await response.json();
    })
    .catch((e) => {
      console.error('\nError in completeUpload', e);
      throw e;
    });
};

const createMediaItem = async (imageData: {
  name: string;
  description: string;
  fileId: string;
}): Promise<{ link: string; fileId: string }> => {
  const accessToken: string = (await generateToken()).access_token;

  return await fetch(`${API_URL}/api/content/v1/media`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'text/plain',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(imageData),
  })
    .then(async (response: Response) => {
      return await response.json();
    })
    .catch((e) => {
      console.error('\nError in generateUploadLink', e);
      throw e;
    });
};

export const uploadSingleImage = async (
  image: Media,
  options?: {
    onGenerateLinkSuccess?: (id: string) => void;
    onGenerateLinkError?: (id: string, error: Error) => void;
    onUploadBinarySuccess?: (id: string) => void;
    onUploadBinaryError?: (id: string, error: Error) => void;
    onCompleteUploadSuccess?: (id: string) => void;
    onCompleteUploadError?: (id: string, error: Error) => void;
    onCreateMediaSuccess?: (id: string) => void;
    onCreateMediaError?: (id: string, error: Error) => void;
  }
) => {
  const fileExtension = image.fileType.substring(image.fileType.indexOf('/') + 1);
  const name = `${image.name}.${fileExtension}`;

  const uploadLinkData = await generateUploadLink({
    fileName: name,
    fileType: image.fileType,
    fileSize: image.fileSize,
  })
    .then((response) => {
      options?.onGenerateLinkSuccess && options.onGenerateLinkSuccess(image.id);
      return response;
    })
    .catch((error) => {
      options?.onGenerateLinkError && options.onGenerateLinkError(image.id, error);
      throw error;
    });

  await uploadBinary(uploadLinkData?.link, image.fileUrl)
    .then(() => {
      options?.onUploadBinarySuccess && options.onUploadBinarySuccess(image.id);
    })
    .catch((error) => {
      options?.onUploadBinaryError && options.onUploadBinaryError(image.id, error);
      throw error;
    });

  await completeUpload(uploadLinkData?.fileId, {
    fileType: image.fileType,
    fileSize: image.fileSize,
  })
    .then(() => {
      options?.onCompleteUploadSuccess && options.onCompleteUploadSuccess(image.id);
    })
    .catch((error) => {
      options?.onCompleteUploadError && options.onCompleteUploadError(image.id, error);
      throw error;
    });

  const uploadedMedia = await createMediaItem({
    name,
    description: image.description,
    fileId: uploadLinkData?.fileId,
  })
    .then((response) => {
      options?.onCreateMediaSuccess && options.onCreateMediaSuccess(image.id);
      return response;
    })
    .catch((error) => {
      options?.onCreateMediaError && options.onCreateMediaError(image.id, error);
      throw error;
    });

  return uploadedMedia;
};

export const uploadMultipleImages = async (images: Media[]) => {
  const uploadedImages = await Promise.all(images.map((image) => uploadSingleImage(image)))
    .then((mediaItems) => {
      return images.map((image, index) => ({ ...image, ...mediaItems[index], stateId: image.id }));
    })
    .catch(() => {
      throw Error('Error on media batch upload');
    });

  return uploadedImages;
};
