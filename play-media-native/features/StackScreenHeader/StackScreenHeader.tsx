import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { useFilters } from '../../hooks/useFilters/useFilters';
import { StackNavigationProp } from '../../interfaces/navigators';
import { theme } from '../../theme/theme';

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    backgroundColor: theme.colors.black.darkest,
  },
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    paddingTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.fontSize.xl,
  },
  subtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray.DEFAULT,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  searchIcon: {
    borderRadius: 3,
    marginHorizontal: theme.spacing.xxs,
    position: 'absolute',
    right: theme.spacing.sm,
    top: theme.spacing.xxs,
  },
});

export const StackScreenHeader = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { visible: isVisible, toggleVisible } = useFilters();

  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [shouldShowBackBtn, setShouldShowBackBtn] = useState();
  const [shouldShowSearchIcon, setShouldShowSearchIcon] = useState();

  useEffect(() => {
    setTitle(route?.params?.title ?? '');
    setSubtitle(route?.params?.subtitle ?? '');
    setShouldShowBackBtn(route?.params?.shouldShowBackBtn ?? true);
    setShouldShowSearchIcon(route?.params?.shouldShowSearchIcon ?? false);
  }, [
    route?.params?.title,
    route?.params?.shouldShowBackBtn,
    route?.params?.subtitle,
    route?.params?.shouldShowSearchIcon,
  ]);

  const headerTitle = title && (
    <Text numberOfLines={1} style={styles.title}>
      {title}
    </Text>
  );
  const headerSubtitle = subtitle && <Text style={styles.subtitle}>{subtitle}</Text>;
  const backBtn = shouldShowBackBtn && (
    <IconButton
      icon={({ size, color }) => <FontAwesomeIcon icon={faArrowLeft} color={color} size={size} />}
      iconColor={theme.colors.white.DEFAULT}
      containerColor={theme.colors.transparent}
      style={styles.backBtn}
      onPress={() => navigation.goBack()}
    />
  );
  const searchIcon = useMemo(
    () =>
      shouldShowSearchIcon && (
        <IconButton
          mode="contained"
          icon={({ size, color }) => <FontAwesomeIcon icon={faSearch} color={color} size={size} />}
          iconColor={isVisible ? theme.colors.black.darkest : theme.colors.yellow.DEFAULT}
          containerColor={isVisible ? theme.colors.yellow.DEFAULT : theme.colors.transparent}
          style={styles.searchIcon}
          theme={{ roundness: 1 }}
          onPress={() => toggleVisible()}
        />
      ),
    [isVisible, shouldShowSearchIcon, toggleVisible]
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        {headerTitle}
        {headerSubtitle}
      </View>
      {backBtn}
      {searchIcon}
    </View>
  );
};
