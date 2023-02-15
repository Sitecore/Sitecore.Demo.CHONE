import { View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { Athlete } from '../../interfaces/athlete';
import { theme } from '../../theme/theme';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';

export const CardAvatar = ({ item, onCardPress }: { item: Athlete; onCardPress?: () => void }) => {
  const sport = item.sport?.results[0];
  const color = getAccentColor(sport?.title) || theme.colors.gray.DEFAULT;

  return (
    <CardShadowBox color={color} onCardPress={onCardPress}>
      <Card.Content style={{ flexDirection: 'row' }}>
        <View>
          <View
            style={{
              backgroundColor: color,
              height: 116,
              width: 116,
              borderRadius: 58,
            }}
          >
            <Avatar.Image
              size={108}
              style={{
                top: theme.spacing.xxs,
                left: theme.spacing.xxs,
              }}
              source={{
                uri: item?.profilePhoto?.results[0]?.fileUrl,
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}
        >
          <Text style={{ marginLeft: theme.spacing.xxs }} variant="titleMedium">
            {item.athleteName}
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              backgroundColor: color,
              color: getTextColor(color),
              left: -theme.spacing.xxs,
              paddingHorizontal: theme.spacing.xs,
              paddingVertical: theme.spacing.xxs,
            }}
          >
            {sport?.title}
          </Text>
          <Text
            style={{
              marginLeft: theme.spacing.xxs,
              color: theme.colors.gray.DEFAULT,
            }}
          >
            {item.nationality}
          </Text>
        </View>
      </Card.Content>
    </CardShadowBox>
  );
};
