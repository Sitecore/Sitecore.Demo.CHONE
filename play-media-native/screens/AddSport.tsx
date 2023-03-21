import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomActions } from '../components/BottomActions/BottomActions';
import { Listing } from '../components/Listing/Listing';
import { CardSport } from '../features/CardSport/CardSport';
import { Screen } from '../features/Screen/Screen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { useSportsQuery } from '../hooks/useSportsQuery/useSportsQuery';
import { Sport } from '../interfaces/sport';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

export const AddSportsScreen = ({ navigation, route }) => {
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;
  const stateKey = route?.params?.stateKey;
  const single = route?.params?.single;
  const headerTitle = route?.params?.title;

  const { contentItems, edit: editFields } = useContentItems();

  const {
    data: sports,
    isLoading: isFetchingInitialSports,
    refetch: refetchSports,
    isRefetching: isRefetchingSports,
  } = useSportsQuery();
  const { calcScrollOffset } = useScrollOffset(true);
  const initialSelectedIDs = useMemo(() => {
    if (Array.isArray(contentItems[stateKey][fieldKey])) {
      return contentItems[stateKey][fieldKey].map((item: Sport) => item.id);
    }

    return contentItems[stateKey][fieldKey]?.id || [];
  }, [contentItems, fieldKey, stateKey]);
  const [selectedSportIDs, setSelectedSportIDs] = useState<string[]>(initialSelectedIDs);
  const noneSelected = !selectedSportIDs?.length;

  const edit = useCallback(
    ({ key, value }: { key: string; value: Sport[] }) => {
      editFields({ id: stateKey, key, value: [...contentItems[stateKey][key], ...value] });
    },
    [contentItems, editFields, stateKey]
  );

  const handleRefresh = useCallback(() => {
    refetchSports();
  }, [refetchSports]);

  const onSelect = useCallback((sport: Sport) => {
    setSelectedSportIDs((prevSelectedSportIDs) => {
      if (prevSelectedSportIDs.includes(sport.id)) {
        return prevSelectedSportIDs.filter((item) => item !== sport.id);
      }

      return [...prevSelectedSportIDs, sport.id];
    });
  }, []);

  const onSelectSingle = useCallback(
    (sport: Sport) => {
      editFields({
        id: stateKey,
        key: fieldKey,
        value: sport,
      });

      navigation.navigate(initialRoute, { title: headerTitle });
    },
    [editFields, stateKey, fieldKey, navigation, initialRoute, headerTitle]
  );

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(() => {
    if (!fieldKey || !initialRoute) {
      return;
    }

    edit({
      key: fieldKey,
      value: sports.filter((item) => selectedSportIDs.includes(item.id)),
    });

    navigation.navigate(initialRoute, { title: headerTitle });
  }, [edit, fieldKey, headerTitle, initialRoute, navigation, selectedSportIDs, sports]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={{ flex: 0.5, margin: theme.spacing.xxs }}>
        <CardSport
          item={item as Sport}
          onPress={() => (single ? onSelectSingle(item) : onSelect(item))}
          selected={selectedSportIDs.includes(item.id)}
        />
      </View>
    ),
    [onSelect, onSelectSingle, selectedSportIDs, single]
  );

  const bottomActions = useMemo(
    () => (
      <>
        {!single && (
          <BottomActions>
            <Button
              mode="outlined"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onCancel}
            >
              Discard
            </Button>
            <Button
              disabled={noneSelected}
              mode="contained"
              labelStyle={styles.buttonLabel}
              style={styles.button}
              onPress={onSubmit}
            >
              {noneSelected ? 'Add' : `Add ${selectedSportIDs.length}`}
            </Button>
          </BottomActions>
        )}
      </>
    ),
    [noneSelected, onCancel, onSubmit, selectedSportIDs.length, single]
  );

  return (
    <Screen>
      <Listing
        data={sports}
        isLoading={isFetchingInitialSports}
        numColumns={2}
        renderItem={renderItem}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingSports}
        style={{ flex: 1, marginBottom: 70 }}
      />
      {bottomActions}
    </Screen>
  );
};
