import { useCallback } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { theme } from '../../theme/theme';

export enum ListingImageDisplayType {
  GRID = 'grid',
  LIST = 'list',
  CARDS = 'cards',
}

const DisplayIconButton = ({ icon, selected, onPress }) => (
  <IconButton
    mode="contained"
    icon={icon}
    iconColor={selected ? theme.colors.yellow.DEFAULT : theme.colors.gray.light}
    containerColor="transparent"
    size={35}
    style={{
      width: 40,
      height: 40,
      borderRadius: 3,
    }}
    onPress={onPress}
  />
);

export const SelectDisplayButtons = ({
  displayType,
  onDisplayTypeChange,
}: {
  displayType: string;
  onDisplayTypeChange?: (value: string) => void;
}) => {
  const onSelect = useCallback(
    (value: string) => {
      if (onDisplayTypeChange) {
        onDisplayTypeChange(value);
      }
    },
    [onDisplayTypeChange]
  );

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.xs,
      }}
    >
      <DisplayIconButton
        icon="view-grid"
        selected={displayType === ListingImageDisplayType.GRID}
        onPress={() => {
          onSelect(ListingImageDisplayType.GRID);
        }}
      />
      <DisplayIconButton
        icon="cards"
        selected={displayType === ListingImageDisplayType.CARDS}
        onPress={() => {
          onSelect(ListingImageDisplayType.CARDS);
        }}
      />
      <DisplayIconButton
        icon="view-list"
        selected={displayType === ListingImageDisplayType.LIST}
        onPress={() => {
          onSelect(ListingImageDisplayType.LIST);
        }}
      />
    </View>
  );
};
