import { fetchGraphQL } from "../..";
import { FetchOptions } from "../../../interfaces/fetchOptions";
import { AllMediaResponse, Media } from "../../../interfaces/media";

const mediaQuery = `
query {
  allMedia (first: 100) {
    total
    results {
      id,
      description,
      fileHeight,
      fileSize,
      fileType,
      fileUrl,
      fileWidth,
      name,
    }
  }
}
`;

export const getAllMedia = async (options?: FetchOptions): Promise<Media[]> => {
  const results: AllMediaResponse = (await fetchGraphQL(
    mediaQuery,
    options
  )) as AllMediaResponse;
  const media: Partial<Media>[] = [];

  results.data.allMedia.results.forEach((item: Partial<Media>) => {
    media.push({
      id: item.id,
      description: item.description,
      fileHeight: item.fileHeight,
      fileSize: item.fileSize,
      fileType: item.fileType,
      fileUrl: item.fileUrl,
      fileWidth: item.fileWidth,
      name: item.name,
    });
  });

  return media as Media[];
};
