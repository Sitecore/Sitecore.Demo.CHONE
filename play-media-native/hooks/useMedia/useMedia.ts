import { useDispatch, useSelector } from 'react-redux';

import { Media } from '../../interfaces/media';
import { RootState } from '../../store';
import { add, clear, edit, remove } from '../../store/media';

export const useMedia = () => {
  const { media } = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch();

  return {
    media,
    add: (media: Media[]) => dispatch(add(media)),
    clear: () => dispatch(clear()),
    edit: (media: Media) => dispatch(edit(media)),
    remove: (media: Media[]) => dispatch(remove(media)),
  };
};
