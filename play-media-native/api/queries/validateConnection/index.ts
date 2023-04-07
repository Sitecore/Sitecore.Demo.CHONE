import { fetchGraphQL } from '../..';
import {
  ERROR_CONNECTIONS_API_KEY,
  ERROR_CONNECTIONS_CLIENT_CREDENTIALS,
} from '../../../constants/connections';
import { storeToken } from '../../../helpers/token';
import { FetchOptions } from '../../../interfaces/fetchOptions';
import { generateToken } from '../generateToken';

const schemaQuery = `
  query {
    __schema {
      types {
        name
      }
    }
  }
`;

const validateSchema = async (options: FetchOptions) => {
  try {
    await fetchGraphQL(schemaQuery, options).then((res: any) => {
      if (!res.data.__schema) {
        throw ERROR_CONNECTIONS_API_KEY;
      }
    });
  } catch {
    throw ERROR_CONNECTIONS_API_KEY;
  }
};

// If token and/or schema responses are not valid, throw an error
export const validateConnection = async (options: FetchOptions): Promise<boolean | unknown> => {
  const promises = [
    generateToken(options)
      .then((token) => storeToken(token))
      .catch(() => {
        return ERROR_CONNECTIONS_CLIENT_CREDENTIALS;
      }),
    validateSchema(options).catch(() => {
      return ERROR_CONNECTIONS_API_KEY;
    }),
  ];

  return Promise.all(promises);
};
