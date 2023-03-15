import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { AvatarImage } from '../../components/AvatarImage/AvatarImage';
import { ATHLETE_MOCK_IMG } from '../../constants/mockImages';
import { getAccentColor, getTextColor } from '../../helpers/colorHelper';
import { Athlete } from '../../interfaces/athlete';
import { theme } from '../../theme/theme';
import { CardShadowBox } from '../CardShadowBox/CardShadowBox';

export const CardAvatar = ({ item, onCardPress }: { item: Athlete; onCardPress?: () => void }) => {
  const sport = item?.sport;
  const color = getAccentColor(sport?.title) || theme.colors.gray.DEFAULT;

  return (
    <CardShadowBox color={color} onCardPress={onCardPress}>
      <Card.Content style={{ flexDirection: 'row' }}>
        <View>
          <AvatarImage
            size={116}
            uri={item?.profilePhoto?.fileUrl || ATHLETE_MOCK_IMG}
            color={color}
          />
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
            {item?.nationality}
          </Text>
          <Text
            style={{
              marginLeft: theme.spacing.xxs,
              color: theme.colors.gray.DEFAULT,
            }}
          >
            {item.status}
          </Text>
        </View>
      </Card.Content>
    </CardShadowBox>
  );
};
