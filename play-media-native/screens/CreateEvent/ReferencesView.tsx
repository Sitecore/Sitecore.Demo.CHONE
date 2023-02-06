import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { StackNavigationProp } from "../../interfaces/navigators";
import { Athlete } from "../../interfaces/athlete";
import { CardAvatar } from "../../features/CardAvatar/CardAvatar";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { CardEvent } from "../../features/CardEvent/CardEvent";
import { Event } from "../../interfaces/event";
import { ContentFieldMedia } from "../../features/ContentFieldMedia/ContentFieldMedia";
import { theme } from "../../theme/theme";
import { ContentFieldReference } from "../../features/ContentFieldReference/ContentFieldReference";

export const ReferencesView = () => {
  const { eventFields } = useEventFields();
  const navigation = useNavigation<StackNavigationProp>();

  const onAddAthletes = useCallback(() => {
    navigation.navigate("AddAthletes", { key: "athletes" });
  }, []);

  const onAddEvents = useCallback(() => {
    navigation.navigate("AddEvents", { key: "relatedEvents" });
  }, []);

  return (
    <NestableScrollContainer>
      <ContentFieldMedia
        fieldKey="featuredImage"
        fieldTitle="Featured Image"
        initialRoute="AddEvent"
        style={{ marginTop: theme.spacing.md }}
      />
      <ContentFieldMedia
        fieldKey="relatedMedia"
        fieldTitle="Related Media"
        initialRoute="AddEvent"
        style={{ marginTop: theme.spacing.lg }}
      />
      <ContentFieldReference
        addRoute={"AddAthletes"}
        createRoute={"AddAthlete"}
        fieldKey="athletes"
        fieldTitle="Related Athletes"
        renderItem={(item: Athlete) => <CardAvatar item={item} />}
        style={{ marginTop: theme.spacing.lg }}
      />
      <ContentFieldReference
        addRoute={"AddEvents"}
        createRoute={"AddEvent"}
        fieldKey="relatedEvents"
        fieldTitle="Similar Events"
        renderItem={(item: Event) => <CardEvent item={item} />}
        style={{ marginTop: theme.spacing.lg }}
      />
      <View style={{ paddingBottom: 100 }} />
    </NestableScrollContainer>
  );
};
