import { FetchOptions } from "../../../interfaces/fetchOptions";
import { Token } from "../../../interfaces/token";
import { store } from "../../../store";

export const generateToken = async (options?: FetchOptions): Promise<Token> => {
  const details = {
    client_id:
      options.clientID ||
      store.getState().connections.selectedConnection?.clientID,
    client_secret:
      options.clientSecret ||
      store.getState().connections.selectedConnection?.clientSecret,
    audience: "https://api.sitecorecloud.io",
    grant_type: "client_credentials",
  };

  const formBody = Object.keys(details)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
    )
    .join("&");

  try {
    return await fetch("https://auth.sitecorecloud.io/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    }).then(async (response: Response) => {
      const jsonResponsePromise = response.json();
      const data = (await jsonResponsePromise) as Token;

      // If there is an error it means client ID and/ or client secret are invalid
      if (data?.error) {
        console.error(
          `${data?.error_description}: Your client ID and/ or client secret are invalid`
        );
        throw data.error;
      }

      return data;
    });
  } catch (error) {
    throw error;
  }
};
