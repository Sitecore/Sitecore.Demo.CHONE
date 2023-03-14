import { ContentItemCreate, ContentItemUpdate } from '../../../interfaces/contentItem';
import { generateToken } from '../generateToken';

const apiURL = 'https://content-api.sitecorecloud.io/api/content/v1/items';

export const createContentItem = async (contentItem: ContentItemCreate): Promise<unknown> => {
  const accessToken: string = (await generateToken()).access_token;

  try {
    return await fetch(apiURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
      },
      body: JSON.stringify(contentItem),
    }).then(async (response: Response) => {
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.status) {
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

export const updateContentItem = async (contentItem: ContentItemUpdate): Promise<unknown> => {
  const accessToken: string = (await generateToken()).access_token;

  try {
    return await fetch(`${apiURL}/${contentItem.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'text/plain',
        'Content-Type': 'application/json-patch+json',
      },
      body: JSON.stringify(contentItem),
    }).then(async (response: Response) => {
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.status) {
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

export const publishContentItem = async (id: string): Promise<unknown> => {
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
          return publishContentItem(id);
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
