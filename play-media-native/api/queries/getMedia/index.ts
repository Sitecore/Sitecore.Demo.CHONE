import { Dimensions } from 'react-native';

import { fetchGraphQL } from '../..';
import { STATUS_TYPES } from '../../../constants/status';
import { FetchOptions } from '../../../interfaces/fetchOptions';
import { AllMediaResponse, Media } from '../../../interfaces/media';
import { getItemsStatus, getItemStatusById } from '../getItemsStatus/getItemsStatus';

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
      fileUrl (
        transform: {
          width: ${Math.ceil(Dimensions.get('window').width)},
          height: ${Math.ceil(Dimensions.get('window').height / 2)},
          fit: SCALEDOWN
        }
      ),
      fileWidth,
      name,
    }
  }
}
`;

export const getAllMedia = async (options?: FetchOptions): Promise<Media[]> => {
  const results: AllMediaResponse = (await fetchGraphQL(mediaQuery, options)) as AllMediaResponse;
  const statusResults = await getItemsStatus(STATUS_TYPES.media);
  const media: Partial<Media>[] = [];

  results.data.allMedia.results.forEach((item: Partial<Media>) => {
    media.push({
      id: item.id,
      status: statusResults.find((statusItem) => statusItem.id === item.id)?.status,
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

const getMediaByIdQuery = (id: string) => {
  return `
  query {
    media (id: "${id}") {
      id,
      description,
      fileHeight,
      fileSize,
      fileType,
      fileUrl (
        transform: {
          width: ${Math.ceil(Dimensions.get('window').width)},
          height: ${Math.ceil(Dimensions.get('window').height)},
          fit: SCALEDOWN
        }
      ),
      fileWidth,
      name,
    }
  }
`;
};

export const getMediaById = async (id: string): Promise<Media | null> => {
  try {
    const mediaResponse: { data: { media: Media } } = (await fetchGraphQL(
      getMediaByIdQuery(id)
    )) as {
      data: { media: Media };
    };
    const statusResult = await getItemStatusById(id, STATUS_TYPES.media);

    return { ...mediaResponse.data.media, status: statusResult.status };
  } catch {
    return null;
  }
};
