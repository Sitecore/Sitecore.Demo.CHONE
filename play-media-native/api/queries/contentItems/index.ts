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
        throw data?.status;
      }

      return data;
    });
  } catch (error) {
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
        throw data?.status;
      }

      return data;
    });
  } catch (error) {
    throw error;
  }
};
