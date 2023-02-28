import { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { Button } from 'react-native-paper';

import { ListingCH1Media } from './ListingCH1Media';
import { BottomActions } from '../../components/BottomActions/BottomActions';
import { MEDIA_SOURCES } from '../../constants/media';
import { Screen } from '../../features/Screen/Screen';
import { removeAlreadySelected } from '../../helpers/media';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { useMediaQuery } from '../../hooks/useMediaQuery/useMediaQuery';
import { Media } from '../../interfaces/media';
import { styles } from '../../theme/styles';

export const AddCH1MediaScreen = ({ navigation, route }) => {
  const { contentItems, edit } = useContentItems();
  const { data: images, isFetching } = useMediaQuery();
  const [selectedMedia, setSelectedMedia] = useState<Media[]>([]);
  const selectedMediaIDs = selectedMedia.map((item) => item.id);

  // route params
  //
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;
  const single = route?.params?.single;
  const stateKey = route?.params?.stateKey;

  const onSelect = useCallback((image: Media) => {
    setSelectedMedia((prevSelectedMedia) => {
      if (prevSelectedMedia.includes(image)) {
        return prevSelectedMedia.filter((item) => item.id !== image.id);
      }

      return [...prevSelectedMedia, image];
    });
  }, []);

  const onSelectSingle = useCallback(
    (image: Media) => {
      edit({
        id: stateKey,
        key: route.params.key,
        value: { ...image, source: MEDIA_SOURCES.CH_ONE },
      });

      navigation.navigate(initialRoute, {
        isEditMedia: false,
      });
    },
    [edit, initialRoute, navigation, route.params.key, stateKey]
  );

  const onAdd = useCallback(() => {
    if (!fieldKey) {
      return;
    }

    edit({
      id: stateKey,
      key: route.params.key,
      value: Array.isArray(contentItems[stateKey][fieldKey])
        ? [
            ...contentItems[stateKey][fieldKey],
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

    navigation.navigate(initialRoute, {
      isEditMedia: false,
    });
  }, [
    contentItems,
    edit,
    fieldKey,
    initialRoute,
    navigation,
    route.params.key,
    selectedMedia,
    stateKey,
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

    return removeAlreadySelected(images, contentItems[stateKey][fieldKey]);
  }, [contentItems, fieldKey, images, stateKey]);

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
