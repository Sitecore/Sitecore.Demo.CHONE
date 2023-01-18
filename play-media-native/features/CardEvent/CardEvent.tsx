import { View, Image, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import { CardShadowBox } from "../CardShadowBox/CardShadowBox";
import { getDate } from "../../helpers/dateHelper";
import { theme } from "../../theme/theme";
import { getAccentColor, getTextColor } from "../../helpers/colorHelper";

export const CardEvent = ({ item, onCardPress }) => {
  const sport = item.sport?.results[0];
  const color = getAccentColor(sport?.title) || theme.colors.gray.DEFAULT;
  const rightLabel = `${getDate(item.timeAndDate)} | ${item.location}`;

  return (
    <>
      <Pressable onPress={onCardPress}>
        <Image
          source={{ uri: item.featuredImage.results[0].fileUrl }}
          style={{
            height: 200,
            resizeMode: "cover",
            marginLeft: -theme.spacing.sm,
            marginRight: -theme.spacing.sm,
            marginBottom: -theme.spacing.sm,
          }}
        />
      </Pressable>
      <CardShadowBox color={color} onCardPress={onCardPress}>
        <Card.Content
          style={{
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.sm,
          }}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
              {sport?.title || "Sport"}
            </Text>
            <Text style={{ color: theme.colors.gray.DEFAULT }}>
              {rightLabel}
            </Text>
          </View>
          <View>
            <Text variant="titleMedium">{item.title}</Text>
          </View>
        </Card.Content>
      </CardShadowBox>
    </>
  );
};
