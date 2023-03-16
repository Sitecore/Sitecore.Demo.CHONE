import { fetchGraphQL } from '../..';
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

// If token and/ or schema responses are not valid, throw an error
export const validateConnection = async (options: FetchOptions): Promise<boolean | unknown> => {
  const promises = [generateToken(options), fetchGraphQL(schemaQuery, options)];

  return Promise.all(promises).catch((e) => {
    throw e;
  });
};
