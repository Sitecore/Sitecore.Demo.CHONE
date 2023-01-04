import { View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

export const CardShadowBox = ({ children, color, onCardPress }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        marginVertical: 10,
        left: 10,
      }}
    >
      <Card
        style={{
          top: -10,
          left: -10,
          borderRadius: 0,
          marginRight: 10,
        }}
        onPress={onCardPress}
      >
        {children}
      </Card>
    </View>
  );
};
