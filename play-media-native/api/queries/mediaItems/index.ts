import { fetchToken } from '../../../helpers/token';
import { Media } from '../../../interfaces/media';

const apiURL = 'https://content-api.sitecorecloud.io/api/content/v1/media';

export const updateMediaItem = async (
  mediaItem: Partial<Media>,
  shouldGenerateNewToken = false
): Promise<unknown> => {
  const accessToken = await fetchToken(shouldGenerateNewToken);

  try {
    return await fetch(`${apiURL}/${mediaItem.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
      },
      body: JSON.stringify({
        id: mediaItem.id,
        name: mediaItem.name,
        description: mediaItem.description,
        fileId: mediaItem.fileId,
      }),
    }).then(async (response: Response) => {
      if (!response?.ok) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (response.status === 429) {
          return updateMediaItem(mediaItem);
        }

        // If the API response status is '401 Unauthorized', retry the request generating a new token along the way
        if (response.status === 401) {
          return updateMediaItem(mediaItem, true);
        }

        console.error(`${response.status} error: ${response?.statusText}`);
        throw response?.status;
      }

      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;
      return data;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const publishMediaItem = async (
  id: string,
  shouldGenerateNewToken = false
): Promise<unknown> => {
  const accessToken = await fetchToken(shouldGenerateNewToken);

  try {
    return await fetch(`${apiURL}/${id}/publish`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
      },
    }).then(async (response: Response) => {
      if (!response?.ok) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (response.status === 429) {
          return publishMediaItem(id);
        }

        // If the API response status is '401 Unauthorized', retry the request generating a new token along the way
        if (response.status === 401) {
          return publishMediaItem(id, true);
        }

        console.error(`${response?.status} error: ${response?.statusText}`);
        throw response?.status;
      }

      return response;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
