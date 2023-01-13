import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { add, clear, clearTemp, editTemp, remove } from "../../store/media";
import { Media } from "../../interfaces/media";

export const useMedia = () => {
  const { media, temp } = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch();

  return {
    media,
    temp,
    add: (media: Media[]) => dispatch(add(media)),
    clear: () => dispatch(clear()),
    clearTemp: () => dispatch(clearTemp()),
    editTemp: (media: Partial<Media>) => dispatch(editTemp(media)),
    remove: (media: Media[]) => dispatch(remove(media)),
  };
};
