import { Media } from '../../../interfaces/media';
import { generateToken } from '../generateToken';

const apiURL = 'https://content-api.sitecorecloud.io/api/content/v1/media';

export const updateMediaItem = async (mediaItem: Partial<Media>): Promise<unknown> => {
  const accessToken: string = (await generateToken()).access_token;

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
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.status) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (data.status === 429) {
          return updateMediaItem(mediaItem);
        }

        console.error(`${data.status} error: ${data?.detail}`);
        throw data?.status;
      }

      return data;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const publishMediaItem = async (id: string): Promise<unknown> => {
  const accessToken: string = (await generateToken()).access_token;

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
