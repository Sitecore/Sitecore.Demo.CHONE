import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clear, edit } from "../../store/tempMedia";

export const useTempMedia = () => {
  const { image, key } = useSelector((state: RootState) => state.tempMedia);
  const dispatch = useDispatch();

  return {
    image,
    key,
    clear: () => dispatch(clear()),
    edit: ({ key, image }) => dispatch(edit({ key, image })),
  };
};
