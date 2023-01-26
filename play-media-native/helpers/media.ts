const afterExtensionRegex = /\.[0-9a-z]+$/i;

export const getFileTypeFromURL = (url: string) => {
  try {
    return `image/${url.match(afterExtensionRegex)[0].replace(".", "")}`;
  } catch {
    return "---";
  }
};

export const getFileType = (image: any) => {
  if (image.fileType) {
    return image.fileType;
  }

  return getFileTypeFromURL(image.uri);
};

export const removeFileExtension = (text: string) => {
  if (text.includes(".")) {
    return text.substring(0, text.lastIndexOf("."));
  }

  return text;
};
