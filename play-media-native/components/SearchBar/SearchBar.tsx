import { Searchbar } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const SearchBar = ({ onSearch, searchQuery }) => {
  return (
    <Searchbar
      iconColor={theme.colors.black.DEFAULT}
      inputStyle={{
        width: '100%',
        color: theme.colors.black.DEFAULT,
      }}
      placeholder="Search"
      placeholderTextColor={theme.colors.black.DEFAULT}
      onChangeText={onSearch}
      value={searchQuery}
      style={{
        backgroundColor: theme.colors.white.DEFAULT,
        color: theme.colors.black.DEFAULT,
        marginHorizontal: theme.spacing.sm,
        marginBottom: theme.spacing.xs,
        height: theme.sizing.inputHeight,
      }}
    />
  );
};
