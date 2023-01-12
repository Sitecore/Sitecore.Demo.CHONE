import { Image, StatusBar, View } from "react-native";
import { theme } from "../theme/theme";
import { useQuery } from "react-query";
import { getAllMedia } from "../api/queries/getMedia";
import { Listing } from "../components/Listing/Listing";
import { SelectableImage } from "../components/SelectableImage/SelectableImage";

const fullWidthStyle = {
  borderRadius: 5,
  height: 200,
  width: "100%",
  marginVertical: theme.spacing.xxs,
};

export const AddCH1MediaScreen = () => {
  const { data: media, isFetching } = useQuery("media", getAllMedia);

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Listing
        data={media}
        isLoading={isFetching}
        renderItem={({ item }) => (
          <SelectableImage
            onSelect={() => console.log("hey")}
            selected={false}
            uri={item.fileUrl}
            style={fullWidthStyle}
          />
        )}
      />
    </>
  );
};
