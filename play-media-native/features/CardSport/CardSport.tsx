import { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { Icon } from '../../components/Icon/Icon';
import { EVENT_MOCK_IMG } from '../../constants/mockImages';
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
    return (
      <Card.Content
        style={{
          backgroundColor: selected ? theme.colors.yellow.DEFAULT : theme.colors.black.light,
          paddingTop: theme.spacing.xxs,
          paddingBottom: theme.spacing.xxs,
          paddingHorizontal: theme.spacing.xs,
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
          {selected ? (
            <>
              <Icon name="checkmark-sharp" size={20} />
              <Text
                style={{
                  color: theme.colors.black.DEFAULT,
                  marginLeft: theme.spacing.xxs,
                }}
              >
                {item?.title || ''}
              </Text>
            </>
          ) : (
            <Text
              style={{
                color: theme.colors.gray.DEFAULT,
              }}
            >
              {item?.title || ''}
            </Text>
          )}
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
        source={{ uri: item?.featuredImage?.fileUrl || EVENT_MOCK_IMG }}
        theme={{ roundness: 0 }}
      />
      {content}
    </Card>
  );
};
