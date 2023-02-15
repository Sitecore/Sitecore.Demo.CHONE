import { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { useQuery } from 'react-query';

import { ListingCH1Media } from './ListingCH1Media';
import { getAllMedia } from '../../api/queries/getMedia';
import { BottomActions } from '../../components/BottomActions/BottomActions';
import { CONTENT_TYPES } from '../../constants/contentTypes';
import { MEDIA_SOURCES } from '../../constants/media';
import { Screen } from '../../features/Screen/Screen';
import { removeAlreadySelected } from '../../helpers/media';
import { useAthleteFields } from '../../hooks/useAthleteFields/useAthleteFields';
import { useEventFields } from '../../hooks/useEventFields/useEventFields';
import { Media } from '../../interfaces/media';
import { styles } from '../../theme/styles';

export const AddCH1MediaScreen = ({ navigation, route }) => {
  const { eventFields, edit: editEventFields } = useEventFields();
  const { athleteFields, edit: editAthleteFields } = useAthleteFields();
  const { data: images, isFetching } = useQuery('media', () => getAllMedia());
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
  const selectedMediaIDs = selectedMedia.map((item) => item.id);
  const contentType = route?.params?.contentType;
  const single = route?.params?.single;
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;

  const onSelect = useCallback((image: Media) => {
    // Cannot change selected status if media already selected
    //

    setSelectedMedia((prevSelectedMedia) => {
      if (prevSelectedMedia.includes(image)) {
        return prevSelectedMedia.filter((item) => item.id !== image.id);
      }

      return [...prevSelectedMedia, image];
    });
  }, []);

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
    [contentType, editAthleteFields, editEventFields, initialRoute, navigation, route.params.key]
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
    contentType,
    editAthleteFields,
    editEventFields,
    eventFields,
    initialRoute,
    navigation,
    route.params.key,
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
          {selectedMedia?.length ? `Add ${selectedMedia.length}` : 'Add'}
        </Button>
      </BottomActions>
    ),
    [onAdd, onDiscard, selectedMedia.length]
  );

  const availableImages = useMemo(() => {
    if (!images?.length) {
      return [];
    }

    return contentType === CONTENT_TYPES.EVENT
      ? removeAlreadySelected(images, eventFields[fieldKey])
      : removeAlreadySelected(images, athleteFields[fieldKey]);
  }, [athleteFields, contentType, eventFields, fieldKey, images]);

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
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
