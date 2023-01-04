import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { CardShadowBox } from "../CardShadowBox/CardShadowBox";

export const CardAvatar = ({ item, onCardPress }) => {
  const sport = item.sport?.results[0];
  const color = sport.color || "gray";

  return (
    <CardShadowBox color={color} onCardPress={onCardPress}>
      <Card.Content style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: color,
              height: 110,
              width: 110,
              borderRadius: 55,
            }}
          >
            <Avatar.Image
              size={100}
              style={{
                top: 5,
                left: 5,
              }}
              source={{
                uri: item.profilePhoto.results[0].fileUrl,
              }}
            />
          </View>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text
            style={{ marginLeft: 5, fontWeight: "bold" }}
            variant="titleMedium"
          >
            {item.athleteName}
          </Text>
          <Text
            style={{
              backgroundColor: color,
              left: -5,
              paddingLeft: 10,
              marginVertical: 5,
              paddingVertical: 5,
            }}
          >
            {sport.title}
          </Text>
          <Text style={{ marginLeft: 5 }}>{item.nationality}</Text>
        </View>
      </Card.Content>
    </CardShadowBox>
  );
};
