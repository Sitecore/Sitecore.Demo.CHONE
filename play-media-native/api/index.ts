type GraphQLResponseWithErrors = {
  errors: unknown[];
};

const CHONE_PREVIEW_API_KEY =
  "SlVLNUQzSGFCY0lmekdJekFlSWZITU92MnlhUldYL0VaME1BVHh5ZUljMD18aGMtZGVtby10ZWFtLXBsYXktbWVkaWEtZWE1YmE=";
const CHONE_PREVIEW_API_URL =
  "https://content-api.sitecorecloud.io/api/content/v1/preview/graphql/";

export async function fetchGraphQL(query: string): Promise<unknown> {
  try {
    return await fetch(endpointUrl, {
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
