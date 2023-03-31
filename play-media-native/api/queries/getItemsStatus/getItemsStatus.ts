import { STATUS_TYPES } from '../../../constants/status';
import { StatusResult } from '../../../interfaces/statusResults';
import { generateToken } from '../generateToken';

type StatusTypes = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];

export const getItemsStatus = async (type: StatusTypes): Promise<StatusResult[]> => {
  const accessToken: string = (await generateToken()).access_token;

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
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.status) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (data.status === 429) {
          return getItemsStatus(type);
        }

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

export const getItemStatusById = async (id: string, type: StatusTypes): Promise<StatusResult> => {
  const accessToken: string = (await generateToken()).access_token;
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
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.status) {
        // If the API response status is '429 Too Many Requests', retry the request
        if (data.status === 429) {
          return getItemStatusById(id, type);
        }

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
