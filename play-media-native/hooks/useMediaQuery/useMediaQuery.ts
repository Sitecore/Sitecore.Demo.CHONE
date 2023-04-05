import { useQuery } from 'react-query';

import { getAllMedia } from '../../api/queries/getMedia';

export const useMediaQuery = (id = undefined, status = undefined) =>
  useQuery('media', () => getAllMedia(), {
    onSuccess: (mediaItems) => {
      // Manually update selected media item's status
      if (id && status) {
        mediaItems.find((mediaItem) => mediaItem.id === id).status = status;
      }
    },
  });
