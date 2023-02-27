import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Sport } from '../../interfaces/sport';
import { theme } from '../../theme/theme';

export const CardSport = ({ item }: { item: Sport }) => {
  return (
    <Card
      key={item.id}
      style={{
        marginBottom: theme.spacing.xs,
      }}
    >
      <Card.Cover
        style={{
          backgroundColor: theme.colors.black.DEFAULT,
          height: 140,
        }}
        source={{ uri: null }}
      />
      <Card.Content
        style={{
          backgroundColor: theme.colors.black.lightest,
          paddingTop: theme.spacing.sm,
        }}
      >
        <View style={{ position: 'relative', width: '100%' }}>
          <Text>{item?.title || ''}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};
