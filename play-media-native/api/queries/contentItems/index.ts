import { fetchToken } from '../../../helpers/token';
import { ContentItemCreate, ContentItemUpdate } from '../../../interfaces/contentItem';

const apiURL = 'https://content-api.sitecorecloud.io/api/content/v1/items';

export const createContentItem = async (
  contentItem: ContentItemCreate,
  shouldGenerateNewToken = false
): Promise<unknown> => {
  const accessToken = await fetchToken(shouldGenerateNewToken);

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
      if (!response?.ok) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (response.status === 429) {
          return createContentItem(contentItem);
        }

        // If the API response status is '401 Unauthorized', retry the request generating a new token along the way
        if (response.status === 401) {
          return createContentItem(contentItem, true);
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

export const updateContentItem = async (
  contentItem: ContentItemUpdate,
  shouldGenerateNewToken = false
): Promise<unknown> => {
  const accessToken = await fetchToken(shouldGenerateNewToken);

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
      if (!response?.ok) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (response.status === 429) {
          return updateContentItem(contentItem);
        }

        // If the API response status is '401 Unauthorized', retry the request generating a new token along the way
        if (response.status === 401) {
          return updateContentItem(contentItem, true);
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

export const publishContentItem = async (
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
          return publishContentItem(id);
        }

        // If the API response status is '401 Unauthorized', retry the request generating a new token along the way
        if (response.status === 401) {
          return publishContentItem(id, true);
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
