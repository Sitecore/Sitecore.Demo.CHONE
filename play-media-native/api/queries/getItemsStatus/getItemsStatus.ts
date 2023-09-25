import { STATUS_TYPES } from '../../../constants/status';
import { fetchToken } from '../../../helpers/token';
import { StatusResult } from '../../../interfaces/statusResults';

type StatusTypes = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];

export const getItemsStatus = async (
  type: StatusTypes,
  shouldGenerateNewToken = false
): Promise<StatusResult[]> => {
  const accessToken = await fetchToken(shouldGenerateNewToken);

  const fetchURL = `https://content-api.sitecorecloud.io/api/content/v1/${type}?${
    type === STATUS_TYPES.content ? 'view=excludeCustomFields&' : ''
  }pageSize=100`;

  try {
    return await fetch(fetchURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (response: Response) => {
      if (!response?.ok) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (response.status === 429) {
          return getItemsStatus(type);
        }

        // If the API response status is '401 Unauthorized', retry the request generating a new token along the way
        if (response.status === 401) {
          return getItemsStatus(type, true);
        }

        console.error(`${response.status} error: ${response?.statusText}`);
        throw response?.status;
      }

      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      const itemsStatus = data.data.map((item: any) => ({
        id: item.id,
        status: item.system.status,
      }));
      return itemsStatus;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getItemStatusById = async (
  id: string,
  type: StatusTypes,
  shouldGenerateNewToken = false
): Promise<StatusResult> => {
  const accessToken = await fetchToken(shouldGenerateNewToken);
  const fetchURL = `https://content-api.sitecorecloud.io/api/content/v1/${type}/${id}`;

  try {
    return await fetch(fetchURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (response: Response) => {
      if (!response?.ok) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (response.status === 429) {
          return getItemStatusById(id, type);
        }

        // If the API response status is '401 Unauthorized', retry the request generating a new token along the way
        if (response.status === 401) {
          return getItemStatusById(id, type, true);
        }

        console.error(`${response.status} error: ${response?.statusText}`);
        throw response?.status;
      }

      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      const itemStatus = {
        id: data.id,
        status: data.system.status,
      };
      return itemStatus;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
