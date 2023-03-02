import { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Icon } from '../../components/Icon/Icon';
import { Sport } from '../../interfaces/sport';
import { theme } from '../../theme/theme';

export const CardSport = ({
  item,
  onPress,
  selected,
  style,
}: {
  item: Sport;
  onPress?: () => void;
  selected?: boolean;
  style?: ViewStyle;
}) => {
  const content = useMemo(() => {
    if (selected) {
      return (
        <Card.Content
          style={{
            backgroundColor: theme.colors.yellow.DEFAULT,
            paddingTop: theme.spacing.sm,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
            }}
          >
            <Icon name="checkmark-sharp" size={20} />
            <Text style={{ color: theme.colors.black.DEFAULT, marginLeft: theme.spacing.xxs }}>
              {item?.title || ''}
            </Text>
          </View>
        </Card.Content>
      );
    }

    return (
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
    );
  }, [item?.title, selected]);

  return (
    <Card
      key={item.id}
      onPress={onPress}
      style={{
        marginBottom: theme.spacing.xs,
        ...style,
      }}
    >
      <Card.Cover
        style={{
          backgroundColor: theme.colors.black.DEFAULT,
          height: 140,
        }}
        source={{ uri: item?.featuredImage?.fileUrl }}
      />
      {content}
    </Card>
  );
};
