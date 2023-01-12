import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { add, clear, remove } from "../../store/media";
import { Media } from "../../interfaces/media";

export const useConnections = () => {
  const { media } = useSelector((state: RootState) => state.media);
  const dispatch = useDispatch();

  return {
    media,
    add: (media: Media[]) => dispatch(add(media)),
    clear: () => dispatch(clear()),
    remove: (media: Media[]) => dispatch(remove(media)),
  };
};
