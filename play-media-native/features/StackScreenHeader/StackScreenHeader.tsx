import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { Logo } from '../../components/Logo/Logo';
import { TabHeaderNavigationProp } from '../../interfaces/navigators';
import { theme } from '../../theme/theme';

export const StackScreenHeader = () => {
  const navigation = useNavigation<TabHeaderNavigationProp>();

  return (
    <View
      style={{
        paddingTop: theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        backgroundColor: theme.colors.black.darkest,
        alignItems: 'center',
      }}
    >
      <IconButton
        icon={({ size, color }) => <FontAwesomeIcon icon={faArrowLeft} color={color} size={size} />}
        iconColor={theme.colors.white.DEFAULT}
        containerColor={theme.colors.transparent}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        onPress={() => navigation.goBack()}
      />
      <Logo />
    </View>
  );
};
