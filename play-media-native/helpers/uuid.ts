import uuid from 'react-native-uuid';

export const generateID = (): string => {
  return uuid.v4().toString();
};
