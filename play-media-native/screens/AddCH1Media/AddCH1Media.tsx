import { useCallback, useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { Media } from "../../interfaces/media";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { Button } from "react-native-paper";
import { useMedia } from "../../hooks/useMedia/useMedia";
import { ListingCH1Media } from "./ListingCH1Media";
import { MEDIA_SOURCES } from "../../constants/media";
import { styles } from "../../theme/styles";
import { Screen } from "../../features/Screen/Screen";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";

export const AddCH1MediaScreen = ({ navigation }) => {
  const { edit } = useEventFields();
  const { add, media: storeMedia } = useMedia();
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
  const selectedMediaIDs = selectedMedia.map((item) => item.id);

  const onSelect = useCallback(
    (image: Media) => {
      // Cannot change selected status if media in global state
      //
      if (storeMedia.includes(image)) {
        return;
      }

      setSelectedMedia((prevSelectedMedia) => {
        if (prevSelectedMedia.includes(image)) {
          return prevSelectedMedia.filter((item) => item.id !== image.id);
        }

        return [...prevSelectedMedia, image];
      });
    },
    [storeMedia]
  );

  const onAdd = useCallback(() => {
    edit({
      key: "relatedMedia",
      value: selectedMedia.map((item) => ({
        ...item,
        source: MEDIA_SOURCES.CH_ONE,
      })),
    });
    navigation.goBack();
  }, [edit, selectedMedia]);

  const onDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const actions = useMemo(
    () => (
      <BottomActions>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={onDiscard}
        >
          Discard
        </Button>
        <Button
          disabled={!selectedMedia?.length}
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={onAdd}
        >
          {selectedMedia?.length ? `Add ${selectedMedia.length}` : `Add`}
        </Button>
      </BottomActions>
    ),
    [selectedMedia]
  );

  return (
    <Screen>
      <StatusBar barStyle={"light-content"} />
      <ListingCH1Media
        onSelect={onSelect}
        selectedMediaIDs={selectedMediaIDs}
      />
      {actions}
    </Screen>
  );
};
