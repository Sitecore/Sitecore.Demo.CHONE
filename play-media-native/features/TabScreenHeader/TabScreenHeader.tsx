import { View } from "react-native";
import { Logo } from "../../components/Logo/Logo";
import { Button, Text } from "react-native-paper";
import { theme } from "../../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { SecondaryMenu } from "../SecondaryMenu/SecondaryMenu";

type TabScreenHeaderProps = {
  navigation: any;
  type: "Event" | "Athlete";
};

export const TabScreenHeader = ({ navigation, type }: TabScreenHeaderProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + theme.spacing.xs,
        paddingBottom: theme.spacing.sm,
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
        <Logo style={{ width: "80%" }} />
        <SecondaryMenu />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: theme.spacing.sm,
        }}
      >
        <Button
          mode="outlined"
          icon={({ size, color }) => (
            <FontAwesomeIcon icon={faFilter} color={color} size={size} />
          )}
          labelStyle={{
            fontFamily: theme.fontFamily.medium,
            fontSize: theme.fontSize.base,
            lineHeight: 30,
          }}
          style={{
            marginRight: theme.spacing.xs,
            borderColor: filtersOpen
              ? theme.colors.yellow.DEFAULT
              : theme.colors.transparent,
          }}
          onPress={() => setFiltersOpen(!filtersOpen)}
        >
          Filter
        </Button>
        <Button
          mode="contained"
          icon={({ size, color }) => (
            <FontAwesomeIcon icon={faPlus} color={color} size={size} />
          )}
          labelStyle={{
            fontFamily: theme.fontFamily.medium,
            fontSize: theme.fontSize.base,
            lineHeight: 30,
          }}
          // to align with outline button
          style={{
            borderWidth: 1,
            borderColor: theme.colors.yellow.DEFAULT,
          }}
          onPress={() => navigation.navigate(`Add${type}`)}
        >
          {type}
        </Button>
      </View>
      {filtersOpen && <Text>Filters go here</Text>}
    </View>
  );
};
