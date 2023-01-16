const extensionRegex = /\.[0-9a-z]+$/i;

export const getFileTypeFromURL = (url: string) => {
  try {
    return url.match(extensionRegex)[0].replace(".", "");
  } catch {
    return "---";
  }
};
