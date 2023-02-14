import * as SecureStore from 'expo-secure-store';

export const save = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getValueFor = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

export const deleteValuesFor = async (keys: string[]) => {
  const promises = keys.map((key) => SecureStore.deleteItemAsync(key));
  await Promise.all(promises);
};
