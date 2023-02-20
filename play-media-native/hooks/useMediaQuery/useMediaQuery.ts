import { useQuery } from 'react-query';

import { getAllMedia } from '../../api/queries/getMedia';

export const useMediaQuery = () => useQuery('media', () => getAllMedia());
