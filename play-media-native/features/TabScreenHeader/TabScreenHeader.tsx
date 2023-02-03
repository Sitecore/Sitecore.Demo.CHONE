import { View, StyleSheet } from "react-native";
import { Logo } from "../../components/Logo/Logo";
import { Badge, IconButton } from "react-native-paper";
import { theme } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "../../interfaces/navigators";
import { useFilters } from "../../hooks/useFilters/useFilters";

type TabScreenHeaderProps = {
  type: "Event" | "Athlete";
};

export const TabScreenHeader = ({ type }: TabScreenHeaderProps) => {
  const navigation = useNavigation<StackNavigationProp>();
  const { visible, athleteFiltersActive, eventFiltersActive, toggleVisible } =
    useFilters();

  const styles = StyleSheet.create({
    header: {
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.xs,
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
      backgroundColor: theme.colors.black.darkest,
    },
    row: {
      flexDirection: "row",
    },
    button: {
      borderRadius: 3,
      marginHorizontal: theme.spacing.xxs,
    },
    badge: {
      position: "absolute",
      top: 0,
      right: 0,
    },
  });

  const badge = useMemo(() => {
    if (type === "Athlete" && athleteFiltersActive > 0) {
      return <Badge style={styles.badge}>{athleteFiltersActive}</Badge>;
    }

    if (type === "Event" && eventFiltersActive > 0) {
      return <Badge style={styles.badge}>{eventFiltersActive}</Badge>;
    }
  }, [type, eventFiltersActive, athleteFiltersActive]);

  return (
    <View style={styles.header}>
      <View
        style={[
          styles.row,
          {
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <Logo />
        <View style={styles.row}>
          <View>
            <IconButton
              mode="contained"
              icon={({ size, color }) => (
                <FontAwesomeIcon icon={faFilter} color={color} size={size} />
              )}
              iconColor={
                visible
                  ? theme.colors.black.darkest
                  : theme.colors.yellow.DEFAULT
              }
              containerColor={
                visible ? theme.colors.yellow.DEFAULT : theme.colors.transparent
              }
              style={styles.button}
              theme={{ roundness: 1 }}
              onPress={() => toggleVisible()}
            />
            {badge}
          </View>
          <IconButton
            mode="contained"
            icon="connection"
            iconColor={theme.colors.yellow.DEFAULT}
            containerColor={theme.colors.transparent}
            style={[
              styles.button,
              {
                marginRight: 0,
              },
            ]}
            theme={{ roundness: 1 }}
            onPress={() => navigation.navigate("SelectConnection")}
          />
        </View>
      </View>
    </View>
  );
};
