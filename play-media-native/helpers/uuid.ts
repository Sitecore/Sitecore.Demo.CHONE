import uuid from "react-native-uuid";

export const generateID = () => {
  return uuid.v4();
};
