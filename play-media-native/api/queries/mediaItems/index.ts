import { generateToken } from '../generateToken';

const apiURL = 'https://content-api.sitecorecloud.io/api/content/v1/media';

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
