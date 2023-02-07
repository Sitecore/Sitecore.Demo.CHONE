import { useCallback, useMemo } from "react";
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
import { ActionMenu } from "../../features/ActionMenu/ActionMenu";

const athleteMenuStyle = {
  position: "absolute",
  bottom: 15,
  right: 0,
  zIndex: 12,
};

const eventMenuStyle = {
  position: "absolute",
  bottom: 20,
  right: 18,
  zIndex: 10,
};

export const ReferencesView = () => {
  const { eventFields, remove } = useEventFields();
  const contentType = CONTENT_TYPES.EVENT;

  const deleteItem = useCallback(
    (key: string, item: any) => {
      remove({ key, value: item });
    },
    [remove]
  );

  const getMenuItems = useCallback(
    (key: string, item: any) => [
      {
        icon: "delete-outline",
        handler: () => deleteItem(key, item),
        title: "Delete",
      },
    ],
    [deleteItem]
  );

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
        renderItem={(item: Athlete) => (
          <View style={{ position: "relative" }}>
            <CardAvatar item={item} />
            <ActionMenu
              iconColor={theme.colors.black.DEFAULT}
              iconSize={25}
              menuItems={getMenuItems("athletes", item)}
              style={athleteMenuStyle}
            />
          </View>
        )}
        style={{ marginTop: theme.spacing.lg }}
      />
      <ContentFieldReference
        addRoute={"AddEvents"}
        contentType={contentType}
        createRoute={"AddEvent"}
        fieldKey="relatedEvents"
        fieldTitle="Similar Events"
        initialRoute={"AddEvent"}
        renderItem={(item: Event) => (
          <View style={{ position: "relative" }}>
            <CardEvent item={item} />
            <ActionMenu
              iconColor={theme.colors.black.DEFAULT}
              iconSize={25}
              menuItems={getMenuItems("relatedEvents", item)}
              style={eventMenuStyle}
            />
          </View>
        )}
        style={{ marginTop: theme.spacing.lg }}
      />
      <View style={{ paddingBottom: 100 }} />
    </NestableScrollContainer>
  );
};
