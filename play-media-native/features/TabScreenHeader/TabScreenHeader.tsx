import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge, IconButton } from 'react-native-paper';

import { Logo } from '../../components/Logo/Logo';
import { useFilters } from '../../hooks/useFilters/useFilters';
import { StackNavigationProp } from '../../interfaces/navigators';
import { theme } from '../../theme/theme';

type TabScreenHeaderProps = {
  type: 'Event' | 'Athlete' | 'Media';
};

export const TabScreenHeader = ({ type }: TabScreenHeaderProps) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { visible, athleteFiltersActive, eventFiltersActive, toggleVisible } = useFilters();

  const styles = StyleSheet.create({
    header: {
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.xs,
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
      backgroundColor: theme.colors.black.darkest,
    },
    row: {
      flexDirection: 'row',
    },
    button: {
      borderRadius: 3,
      marginHorizontal: theme.spacing.xxs,
    },
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  });

  const badge = useMemo(() => {
    if (type === 'Athlete' && athleteFiltersActive > 0) {
      return <Badge style={styles.badge}>{athleteFiltersActive}</Badge>;
    }

    if (type === 'Event' && eventFiltersActive > 0) {
      return <Badge style={styles.badge}>{eventFiltersActive}</Badge>;
    }
  }, [type, athleteFiltersActive, eventFiltersActive, styles.badge]);

  return (
    <View style={styles.header}>
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <Logo />
        <View style={styles.row}>
          <View>
            <IconButton
              mode="contained"
              icon={({ size, color }) => (
                <FontAwesomeIcon icon={faSearch} color={color} size={size} />
              )}
              iconColor={visible ? theme.colors.black.darkest : theme.colors.yellow.DEFAULT}
              containerColor={visible ? theme.colors.yellow.DEFAULT : theme.colors.transparent}
              style={styles.button}
              theme={{ roundness: 1 }}
              onPress={() => toggleVisible()}
            />
            {badge}
          </View>
          <IconButton
            mode="contained"
            icon="connection"
            iconColor={theme.colors.yellow.DEFAULT}
            containerColor={theme.colors.transparent}
            style={[
              styles.button,
              {
                marginRight: 0,
              },
            ]}
            theme={{ roundness: 1 }}
            onPress={() => navigation.navigate('SelectConnection')}
          />
        </View>
      </View>
    </View>
  );
};
