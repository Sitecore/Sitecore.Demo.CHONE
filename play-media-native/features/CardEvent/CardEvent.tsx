import { View, Image, Pressable } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { EVENT_MOCK_IMG } from '../../constants/mockImages';
import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { getDate } from '../../helpers/dateHelper';
import { Event } from '../../interfaces/event';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';

export const CardEvent = ({
  item,
  onCardPress,
  isSimple,
}: {
  item: Event;
  onCardPress?: () => void;
  isSimple?: boolean;
}) => {
  const sport = item.sport;
  const color = getAccentColor(sport?.title) || theme.colors.gray.DEFAULT;
  const timeLocationLabel = `${getDate(item.timeAndDate)} | ${item.location}`;

  return (
    <>
      {!isSimple && (
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
      )}
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
                style={[
                  styles.sportLabel,
                  {
                    backgroundColor: color,
                    color: getTextColor(color),
                  },
                ]}
              >
                {sport?.title || 'Sport'}
              </Text>
              <Text style={{ color: theme.colors.gray.DEFAULT }}>{item.status}</Text>
            </View>
            <Text style={{ color: theme.colors.gray.DEFAULT }}>{timeLocationLabel}</Text>
            <View>
              <Text variant="titleMedium">{item.title}</Text>
            </View>
          </Card.Content>
        </CardShadowBox>
      </View>
    </>
  );
};
