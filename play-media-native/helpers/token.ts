import { getValueFor, save } from './secureStorage';
import { generateToken } from '../api/queries/generateToken';
import { Token } from '../interfaces/token';

const tokenKey = 'AccessToken';

// Store token in Expo Secure Store
export const storeToken = async (token: Token): Promise<void> => {
  try {
    return await save(tokenKey, token.access_token);
  } catch {
    console.error('Error saving access token to Expo Secure Store');
  }
};

// Generates a new token or retrieves it from Expo Secure Store
export const fetchToken = async (shouldGenerateNewToken = false): Promise<string> => {
  let token: Token;
  try {
    if (shouldGenerateNewToken) {
      token = await generateToken();
      storeToken(token);

      return token.access_token;
    }

    const value = await getValueFor(tokenKey);
    return value;
  } catch {
    console.error('Error retrieving access token');
  }
};
