import { useCallback, useState } from 'react';
import { Button } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllSports } from '../api/queries/getSports';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { Listing } from '../components/Listing/Listing';
import { SelectableView } from '../components/SelectableView/SelectableView';
import { CardSport } from '../features/CardSport/CardSport';
import { Screen } from '../features/Screen/Screen';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
import { useScrollOffset } from '../hooks/useScrollOffset/useScrollOffset';
import { Sport } from '../interfaces/sport';
import { styles } from '../theme/styles';

export const AddSportsScreen = ({ navigation, route }) => {
  const fieldKey = route?.params?.key;
  const initialRoute = route?.params?.initialRoute;
  const stateKey = route?.params?.stateKey;
  const single = route?.params?.single;

  const { contentItems, edit: editFields } = useContentItems();

  const {
    data: sports,
    isLoading: isFetchingInitialSports,
    refetch: refetchSports,
    isRefetching: isRefetchingSports,
  } = useQuery('sports', () => getAllSports());
  const { calcScrollOffset } = useScrollOffset(true);
  const [selectedSportIDs, setSelectedSportIDs] = useState<string[]>([]);
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
        key: route.params.key,
        value: sport,
      });

      navigation.navigate(initialRoute);
    },
    [editFields, initialRoute, navigation, route.params.key, stateKey]
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

    navigation.navigate(initialRoute);
  }, [edit, fieldKey, initialRoute, navigation, selectedSportIDs, sports]);

  return (
    <Screen>
      <Listing
        data={sports}
        isLoading={isFetchingInitialSports}
        renderItem={({ item }) => (
          <SelectableView
            onSelect={() => (single ? onSelectSingle(item) : onSelect(item))}
            selected={selectedSportIDs.includes(item.id)}
          >
            <CardSport item={item as Sport} />
          </SelectableView>
        )}
        onScroll={calcScrollOffset}
        onRefresh={handleRefresh}
        isRefreshing={isRefetchingSports}
        style={{ marginBottom: 70 }}
      />
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
    </Screen>
  );
};
