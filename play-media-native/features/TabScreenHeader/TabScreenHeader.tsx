import { View } from "react-native";
import { Logo } from "../../components/Logo/Logo";
import { Button, IconButton, Text } from "react-native-paper";
import { theme } from "../../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TabHeaderNavigationProp } from "../../interfaces/navigators";

type TabScreenHeaderProps = {
  type: "Event" | "Athlete";
};

export const TabScreenHeader = ({ type }: TabScreenHeaderProps) => {
  const navigation = useNavigation<TabHeaderNavigationProp>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
        backgroundColor: theme.colors.black.darkest,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            mode="contained"
            icon={({ size, color }) => (
              <FontAwesomeIcon icon={faFilter} color={color} size={size} />
            )}
            iconColor={
              filtersOpen
                ? theme.colors.black.darkest
                : theme.colors.yellow.DEFAULT
            }
            containerColor={
              filtersOpen
                ? theme.colors.yellow.DEFAULT
                : theme.colors.transparent
            }
            style={{ borderRadius: 3, marginHorizontal: theme.spacing.xxs }}
            theme={{ roundness: 1 }}
            onPress={() => setFiltersOpen(!filtersOpen)}
          />
          <IconButton
            mode="contained"
            icon={({ size, color }) => (
              <FontAwesomeIcon icon={faGlobe} color={color} size={size} />
            )}
            iconColor={theme.colors.yellow.DEFAULT}
            containerColor={theme.colors.transparent}
            style={{
              borderRadius: 3,
              marginLeft: theme.spacing.xxs,
              marginRight: 0,
            }}
            theme={{ roundness: 1 }}
            onPress={() => navigation.navigate("SelectConnection")}
          />
        </View>
      </View>
      {filtersOpen && <Text>{type} filters go here</Text>}
    </View>
  );
};
