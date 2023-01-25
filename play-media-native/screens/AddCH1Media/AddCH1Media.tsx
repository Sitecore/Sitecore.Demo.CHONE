import { useCallback, useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { theme } from "../../theme/theme";
import { Media } from "../../interfaces/media";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { Button } from "react-native-paper";
import { useMedia } from "../../hooks/useMedia/useMedia";
import { ListingCH1Media } from "./ListingCH1Media";
import { MEDIA_SOURCES } from "../../constants/media";
import { styles } from "../../theme/styles";
import { Screen } from "../../features/Screen/Screen";

const buttonStyle = {
  borderWidth: 1,
  borderColor: theme.colors.yellow.DEFAULT,
  marginHorizontal: theme.spacing.xs,
};

const labelStyle = {
  fontFamily: theme.fontFamily.medium,
  fontSize: theme.fontSize.base,
  lineHeight: 30,
};

export const AddCH1MediaScreen = ({ navigation }) => {
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
    add(
      selectedMedia.map((item) => ({ ...item, source: MEDIA_SOURCES.CH_ONE }))
    );
    setSelectedMedia([]);
    navigation.goBack();
  }, [add, selectedMedia]);

  const onDiscard = useCallback(() => {
    setSelectedMedia([]);
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
