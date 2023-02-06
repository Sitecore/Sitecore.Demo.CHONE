import { View } from "react-native";
import { Athlete } from "../../interfaces/athlete";
import { CardAvatar } from "../../features/CardAvatar/CardAvatar";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { CardEvent } from "../../features/CardEvent/CardEvent";
import { Event } from "../../interfaces/event";
import { ContentFieldMedia } from "../../features/ContentFieldMedia/ContentFieldMedia";
import { theme } from "../../theme/theme";
import { ContentFieldReference } from "../../features/ContentFieldReference/ContentFieldReference";
import { CONTENT_TYPES } from "../../constants/contentTypes";

export const ReferencesView = () => {
  const { eventFields } = useEventFields();
  const contentType = CONTENT_TYPES.EVENT;

  return (
    <NestableScrollContainer>
      <ContentFieldMedia
        fieldKey="featuredImage"
        fieldTitle="Featured Image"
        initialRoute="AddEvent"
        items={eventFields.featuredImage}
        style={{ marginTop: theme.spacing.md }}
      />
      <ContentFieldMedia
        fieldKey="relatedMedia"
        fieldTitle="Related Media"
        initialRoute="AddEvent"
        items={eventFields.relatedMedia}
        style={{ marginTop: theme.spacing.lg }}
      />
      <ContentFieldReference
        addRoute={"AddAthletes"}
        contentType={contentType}
        createRoute={"AddAthlete"}
        fieldKey="athletes"
        fieldTitle="Related Athletes"
        initialRoute={"AddEvent"}
        renderItem={(item: Athlete) => <CardAvatar item={item} />}
        style={{ marginTop: theme.spacing.lg }}
      />
      <ContentFieldReference
        addRoute={"AddEvents"}
        contentType={contentType}
        createRoute={"AddEvent"}
        fieldKey="relatedEvents"
        fieldTitle="Similar Events"
        initialRoute={"AddEvent"}
        renderItem={(item: Event) => <CardEvent item={item} />}
        style={{ marginTop: theme.spacing.lg }}
      />
      <View style={{ paddingBottom: 100 }} />
    </NestableScrollContainer>
  );
};
