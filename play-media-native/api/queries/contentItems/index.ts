import { ContentItem } from "../../../interfaces/contentItem";
import { generateToken } from "../generateToken";

const apiURL = "https://content-api.sitecorecloud.io/api/content/v1/items";

export const createContentItem = async (
  contentItem: ContentItem
): Promise<unknown> => {
  const accessToken: string = (await generateToken()).access_token;

  try {
    return await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "text/plain",
        "Content-Type": "application/json-patch+json",
      },
      body: JSON.stringify(contentItem),
    }).then(async (response: Response) => {
      const jsonResponsePromise = response.json();
      const data = await jsonResponsePromise;

      if (data?.error) {
        console.error(data?.error_description);
        throw data.error;
      }


      return data;
    });
  } catch (error) {
    throw error;
  }
};
