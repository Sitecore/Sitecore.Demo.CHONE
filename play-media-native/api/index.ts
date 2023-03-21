import { ERROR_CONNECTIONS_API_KEY } from '../constants/connections';
import { getSelectedConnection } from '../helpers/connections';
import { FetchOptions } from '../interfaces/fetchOptions';

type GraphQLResponseWithErrors = {
  errors: unknown[];
};

// API key and Preview URL are by default provided by Expo Secure Store.
// Optionally, fetchGrpahQL accepts an options argument, which is useful when validating CH1 connections.
// Preview URL and API key are passed in as parameters, to validate the fields provided.
//
export async function fetchGraphQL(query: string, options?: FetchOptions): Promise<unknown> {
  const selectedConnection = await getSelectedConnection();

  const apiKey = options?.apiKey || selectedConnection?.apiKey;
  const previewUrl = options?.previewUrl || selectedConnection?.previewUrl;

  try {
    return await fetch(previewUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-GQL-Token': apiKey,
      },
      body: JSON.stringify({ query }),
    }).then((response: Response) => {
      if (!response.ok) {
        console.error(
          `GraphQL query failed with error ${response?.status} ${response?.statusText}`
        );
        throw new Error(ERROR_CONNECTIONS_API_KEY);
      }

      const jsonResponsePromise = response.json();
      jsonResponsePromise.then((jsonResponse: unknown) => {
        const responseWithErrors = jsonResponse as GraphQLResponseWithErrors;
        if (responseWithErrors.errors && responseWithErrors.errors.length > 0) {
          console.error(
            'An error was returned by a GraphQL query. See the associated logged object for details.',
            responseWithErrors
          );
          throw new Error(ERROR_CONNECTIONS_API_KEY);
        }
      });
      return jsonResponsePromise;
    });
  } catch (error) {
    console.error(error);
    throw new Error(ERROR_CONNECTIONS_API_KEY);
  }
}
