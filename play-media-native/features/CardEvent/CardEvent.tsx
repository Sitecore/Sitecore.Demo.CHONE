import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { CardShadowBox } from "../CardShadowBox/CardShadowBox";
import { getDate } from "../../helpers/dateHelper";

export const CardEvent = ({ item, onCardPress }) => {
  const sport = item.sport?.results[0];
  const color = sport?.color || "gray";
  const rightLabel = `${getDate(item.timeAndDate)} | ${item.location}`;

  return (
    <CardShadowBox color={color} onCardPress={onCardPress}>
      <Card.Content>
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            backgroundColor: sport?.color || "gray",
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text>{sport?.title || "Sport"}</Text>
        </View>
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 0,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text>{rightLabel}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginTop: 25 }}>
          <Text style={{ marginLeft: 5 }} variant="titleMedium">
            {item.teaser}
          </Text>
        </View>
      </Card.Content>
    </CardShadowBox>
  );
};
