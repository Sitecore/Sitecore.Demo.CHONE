import { store } from "../store";

type GraphQLResponseWithErrors = {
  errors: unknown[];
};

export type FetchOptions = {
  apiKey: string;
  previewUrl: string;
};

// API key and Preview URL are by default provided by the Redux store.
// Optionally, fetchGrpahQL accepts an option argument, which is useful when validating CH1 connections.
// Preview URL and API key are passed in as parameters, to validate the fields provided.
//
export async function fetchGraphQL(
  query: string,
  options?: FetchOptions
): Promise<unknown> {
  const apiKey =
    options?.apiKey || store.getState().connections.selectedConnection?.apiKey;
  const previewUrl =
    options?.previewUrl ||
    store.getState().connections.selectedConnection?.previewUrl;

  try {
    return await fetch(previewUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GQL-Token": apiKey,
      },
      body: JSON.stringify({ query }),
    })
      .then((response: Response) => {
        const jsonResponsePromise = response.json();
        jsonResponsePromise.then((jsonResponse: unknown) => {
          const responseWithErrors = jsonResponse as GraphQLResponseWithErrors;
          if (
            responseWithErrors.errors &&
            responseWithErrors.errors.length > 0
          ) {
            console.error(
              "An error was returned by a GraphQL query. See the associated logged object for details.",
              responseWithErrors
            );
          }
        });
        return jsonResponsePromise;
      })
      .catch((error) => {
        return console.log(error);
      });
  } catch (error) {
    return console.log(error);
  }
}
