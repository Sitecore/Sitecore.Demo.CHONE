import { View, Image, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { EVENT_MOCK_IMG } from '../../constants/mockImages';
import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { getDate } from '../../helpers/dateHelper';
import { Event } from '../../interfaces/event';
import { theme } from '../../theme/theme';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';

export const CardEvent = ({ item, onCardPress }: { item: Event; onCardPress?: () => void }) => {
  const sport = item.sport;
  const color = getAccentColor(sport?.title) || theme.colors.gray.DEFAULT;
  const rightLabel = `${getDate(item.timeAndDate)} | ${item.location}`;

  return (
    <>
      <Pressable onPress={onCardPress}>
        <Image
          source={{ uri: item?.featuredImage?.fileUrl || EVENT_MOCK_IMG }}
          style={{
            height: 200,
            resizeMode: 'cover',
            marginLeft: -theme.spacing.sm,
            marginRight: -theme.spacing.sm,
            marginBottom: -theme.spacing.sm,
          }}
        />
      </Pressable>
      <View style={{ paddingHorizontal: theme.spacing.sm }}>
        <CardShadowBox color={color} onCardPress={onCardPress}>
          <Card.Content
            style={{
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.sm,
            }}
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text
                style={{
                  backgroundColor: color,
                  color: getTextColor(color),
                  paddingLeft: theme.spacing.lg,
                  paddingRight: theme.spacing.xxs,
                  marginLeft: -theme.spacing.lg,
                  marginRight: theme.spacing.sm,
                }}
              >
                {sport?.title || 'Sport'}
              </Text>
              <Text style={{ color: theme.colors.gray.DEFAULT }}>{rightLabel}</Text>
            </View>
            <Text style={{ color: theme.colors.gray.DEFAULT }}>{item.status}</Text>
            <View>
              <Text variant="titleMedium">{item.title}</Text>
            </View>
          </Card.Content>
        </CardShadowBox>
      </View>
    </>
  );
};
