import { StatusResult } from '../../../interfaces/statusResults';
import { generateToken } from '../generateToken';

const contentItemsApiURL =
  'https://content-api.sitecorecloud.io/api/content/v1/items?view=excludeCustomFields&pageSize=100';
const mediaItemsApiURL = 'https://content-api.sitecorecloud.io/api/content/v1/media?pageSize=100';

export const getItemsStatus = async (type: 'media' | 'content'): Promise<StatusResult[]> => {
  const accessToken: string = (await generateToken()).access_token;
  const fetchURL = type === 'media' ? mediaItemsApiURL : contentItemsApiURL;

  try {
    return await fetch(fetchURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (response: Response) => {
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.status) {
        console.error(`${data.status} error: ${data?.detail}`);
        throw data?.status;
      }

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
  type: 'media' | 'content'
): Promise<StatusResult> => {
  const accessToken: string = (await generateToken()).access_token;
  const fetchURL =
    type === 'media'
      ? `https://content-api.sitecorecloud.io/api/content/v1/media/${id}`
      : `https://content-api.sitecorecloud.io/api/content/v1/items/${id}`;

  try {
    return await fetch(fetchURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (response: Response) => {
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.status) {
        console.error(`${data.status} error: ${data?.detail}`);
        throw data?.status;
      }

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
