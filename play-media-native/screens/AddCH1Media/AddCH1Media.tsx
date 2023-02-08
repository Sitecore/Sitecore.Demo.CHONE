import { useCallback, useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { Media } from "../../interfaces/media";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { Button } from "react-native-paper";
import { ListingCH1Media } from "./ListingCH1Media";
import { MEDIA_SOURCES } from "../../constants/media";
import { styles } from "../../theme/styles";
import { Screen } from "../../features/Screen/Screen";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { CONTENT_TYPES } from "../../constants/contentTypes";
import { useQuery } from "react-query";
import { getAllMedia } from "../../api/queries/getMedia";
import { removeAlreadySelected } from "../../helpers/media";
import { useAthleteFields } from "../../hooks/useAthleteFields/useAthleteFields";

export const AddCH1MediaScreen = ({ navigation, route }) => {
  const { eventFields, edit: editEventFields } = useEventFields();
  const { athleteFields, edit: editAthleteFields } = useAthleteFields();
  const { data: images, isFetching } = useQuery("media", () => getAllMedia());
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
  const selectedMediaIDs = selectedMedia.map((item) => item.id);
  const contentType = useMemo(
    () => route?.params?.contentType,
    [route?.params]
  );
  const single = route?.params?.single;
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;

  const onSelect = useCallback(
    (image: Media) => {
      // Cannot change selected status if media already selected
      //

      setSelectedMedia((prevSelectedMedia) => {
        if (prevSelectedMedia.includes(image)) {
          return prevSelectedMedia.filter((item) => item.id !== image.id);
        }

        return [...prevSelectedMedia, image];
      });
    },
    [route?.params?.existingIDs]
  );

  const onSelectSingle = useCallback(
    (image: Media) => {
      if (contentType === CONTENT_TYPES.EVENT) {
        editEventFields({
          key: route.params.key,
          value: { ...image, source: MEDIA_SOURCES.CH_ONE },
        });
      } else {
        editAthleteFields({
          key: route.params.key,
          value: { ...image, source: MEDIA_SOURCES.CH_ONE },
        });
      }

      navigation.navigate(initialRoute, {
        isEditMedia: false,
      });
    },
    [
      editAthleteFields,
      editEventFields,
      initialRoute,
      navigation,
      route?.params,
    ]
  );

  const onAdd = useCallback(() => {
    if (!route?.params?.key) {
      return;
    }

    if (contentType === CONTENT_TYPES.EVENT) {
      editEventFields({
        key: route.params.key,
        value: Array.isArray(eventFields[route.params.key])
          ? [
              ...eventFields[route.params.key],
              ...selectedMedia.map((item) => ({
                ...item,
                source: MEDIA_SOURCES.CH_ONE,
              })),
            ]
          : selectedMedia.map((item) => ({
              ...item,
              source: MEDIA_SOURCES.CH_ONE,
            }))[0],
      });
    } else {
      editAthleteFields({
        key: route.params.key,
        value: Array.isArray(eventFields[route.params.key])
          ? [
              ...athleteFields[route.params.key],
              ...selectedMedia.map((item) => ({
                ...item,
                source: MEDIA_SOURCES.CH_ONE,
              })),
            ]
          : selectedMedia.map((item) => ({
              ...item,
              source: MEDIA_SOURCES.CH_ONE,
            }))[0],
      });
    }

    navigation.navigate(initialRoute, {
      isEditMedia: false,
    });
  }, [
    athleteFields,
    editAthleteFields,
    editEventFields,
    eventFields,
    initialRoute,
    navigation,
    route?.params,
    selectedMedia,
  ]);

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

  const availableImages = useMemo(() => {
    if (!images?.length) {
      return [];
    }

    return contentType === CONTENT_TYPES.EVENT
      ? removeAlreadySelected(images, eventFields[fieldKey])
      : removeAlreadySelected(images, athleteFields[fieldKey]);
  }, [athleteFields, eventFields, fieldKey, images]);

  return (
    <Screen>
      <StatusBar barStyle={"light-content"} />
      <ListingCH1Media
        images={availableImages}
        isFetching={isFetching}
        onSelect={single ? onSelectSingle : onSelect}
        selectedMediaIDs={selectedMediaIDs}
      />
      {actions}
    </Screen>
  );
};
