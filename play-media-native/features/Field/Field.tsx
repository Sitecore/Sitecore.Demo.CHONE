import { View } from "react-native";
import { Media } from "../../interfaces/media";
import { Text } from "react-native-paper";
import { theme } from "../../theme/theme";

interface Props {
  onSelect: (image: Media) => void;
  selectedMediaIDs: string[];
}

export const Field = ({ title, value }: { title: string; value: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Text style={{ fontFamily: theme.fontFamily.bold }}>{`${title}:  `}</Text>
    <Text ellipsizeMode="tail" numberOfLines={1} style={{ flex: 1 }}>
      {value}
    </Text>
  </View>
);
