import { View } from 'react-native';
import { Card } from 'react-native-paper';

import { theme } from '../../theme/theme';

export const CardShadowBox = ({ children, color, onCardPress = undefined }) => {
  return (
    <View
      style={{
        position: 'relative',
        marginBottom: theme.spacing.sm,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: theme.spacing.sm,
          bottom: 0,
          left: theme.spacing.sm,
          right: 0,
          backgroundColor: color,
          zIndex: 1,
          elevation: 1,
        }}
      />
      <View
        style={{
          position: 'relative',
          marginBottom: theme.spacing.xs,
          marginRight: theme.spacing.xs,
          zIndex: 2,
          elevation: 2,
        }}
      >
        <Card theme={{ roundness: 0 }} onPress={onCardPress} mode="contained">
          {children}
        </Card>
      </View>
    </View>
  );
};
