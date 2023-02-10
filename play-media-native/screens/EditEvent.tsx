import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useQuery } from "react-query";
import { LoadingScreen } from "../features/LoadingScreen/LoadingScreen";
import { getDate } from "../helpers/dateHelper";
import { Screen } from "../features/Screen/Screen";
import { styles } from "../theme/styles";
import { BottomActions } from "../components/BottomActions/BottomActions";
import { DatePicker } from "../components/DatePicker/DatePicker";
import { getAllSports } from "../api/queries/getSports";
import { SportPicker } from "../features/SportPicker/SportPicker";
import { InputText } from "../components/InputText/InputText";
import { theme } from "../theme/theme";
import { ContentFieldMedia } from "../features/ContentFieldMedia/ContentFieldMedia";
import { RichTextEditor } from "../components/RichTextEditor/RichTextEditor";
import { useEventFields } from "../hooks/useEventFields/useEventFields";
import { CONTENT_TYPES } from "../constants/contentTypes";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { CardEvent } from "../features/CardEvent/CardEvent";
import { ActionMenu } from "../features/ActionMenu/ActionMenu";
import { ContentFieldReference } from "../features/ContentFieldReference/ContentFieldReference";
import { Athlete } from "../interfaces/athlete";
import { CardAvatar } from "../features/CardAvatar/CardAvatar";
import { Event } from "../interfaces/event";
import { useFocusEffect } from "@react-navigation/native";
import { Sport } from "../interfaces/sport";

const inputContainerStyle = {
  marginBottom: theme.spacing.sm,
};

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

const contentType = CONTENT_TYPES.EVENT;
const initialRoute = "EditEvent";

export const EditEventScreen = ({ route, navigation }) => {
  const { eventFields, edit, remove } = useEventFields();
  const event = useMemo(() => eventFields, [eventFields]) as unknown as Event;

  const { data: sports, isFetching: isFetchingSports } = useQuery(
    "sports",
    () => getAllSports()
  );
  const defaultSport = useMemo(() => {
    const hasSport = !!event?.sport?.title;
    const sportsFetched = !!sports?.length;

    if (hasSport) {
      return event.sport.title;
    }

    if (!hasSport && sportsFetched) {
      return sports[0]?.title;
    }

    return null;
  }, [event, sports]);

  const [title, setTitle] = useState(event?.title);
  const [sport, setSport] = useState<Sport>();
  const [summary, setSummary] = useState(event?.teaser);
  const [date, setDate] = useState(event?.timeAndDate || new Date());
  const [location, setLocation] = useState(event?.location);
  const [body, setBody] = useState<string>(event?.body);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleSportChange = useCallback(
    (sportName: string) => {
      setSport(sports.find((sport) => sport.title === sportName));
    },
    [sports]
  );

  const handleReview = useCallback(() => {
    navigation.navigate("ReviewEvent", {
      title: "Review edited event",
      event: {
        ...event,
        body,
        location,
        sport: sport || sports.find((item) => item.title === defaultSport),
        summary,
        timeAndDate: date,
        title,
      },
    });
  }, [
    body,
    date,
    defaultSport,
    event,
    location,
    sport,
    summary,
    title,
    navigation,
  ]);

  const handleDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: event?.title || "Edit Event",
    });
  }, []);

  // Check route params for images added from route EditMedia (camera, library)
  //
  useFocusEffect(
    useCallback(() => {
      if (!route?.params?.isEditMedia || !route?.params?.key) {
        return;
      }

      if (Array.isArray(event[route.params.key])) {
        edit({
          key: route.params.key,
          value: [...event[route.params.key], route.params.image],
        });
      } else {
        edit({ key: route.params.key, value: route.params.image });
      }
    }, [edit, route?.params])
  );

  if (isFetchingSports) {
    return <LoadingScreen />;
  }

  if (!event && !isFetchingSports) {
    return <Text>Athlete could not be fetched!</Text>;
  }

  return (
    <Screen>
      <NestableScrollContainer>
        <View>
          <SportPicker
            onChange={handleSportChange}
            sports={sports}
            initialValue={defaultSport}
          />

          <InputText
            containerStyle={inputContainerStyle}
            multiline
            onChange={setTitle}
            value={title}
            title={"Title"}
          />
          <InputText
            containerStyle={inputContainerStyle}
            multiline
            onChange={setSummary}
            value={summary}
            title={"Teaser"}
          />
          <InputText
            containerStyle={inputContainerStyle}
            multiline
            value={getDate(date)}
            title={"Event Date"}
            showSoftInputOnFocus={false}
            caretHidden={true}
            onTouchStart={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DatePicker
              value={date}
              visible={showDatePicker}
              onChange={setDate}
              onClose={setShowDatePicker}
            />
          )}
          <InputText
            containerStyle={inputContainerStyle}
            multiline
            onChange={setLocation}
            value={location}
            title={"Location"}
          />
          <View style={inputContainerStyle}>
            <Text style={{ marginBottom: theme.spacing.xs }}>Body</Text>
            <RichTextEditor onChange={(json: string) => setBody(json)} />
          </View>
          <ContentFieldMedia
            contentType={contentType}
            fieldKey="featuredImage"
            fieldTitle="Featured Image"
            initialRoute={initialRoute}
            items={event.featuredImage}
            style={{ marginTop: theme.spacing.md }}
          />
          <ContentFieldMedia
            contentType={contentType}
            fieldKey="relatedMedia"
            fieldTitle="Related Media"
            initialRoute={initialRoute}
            items={event.relatedMedia}
            style={{ marginTop: theme.spacing.lg }}
          />
          <ContentFieldReference
            addRoute={"AddAthletes"}
            contentType={contentType}
            createRoute={"AddAthlete"}
            fieldKey="athletes"
            fieldTitle="Related Athletes"
            initialRoute={initialRoute}
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
            fieldKey="similarEvents"
            fieldTitle="Similar Events"
            initialRoute={initialRoute}
            renderItem={(item: Event) => (
              <View style={{ position: "relative" }}>
                <CardEvent item={item} />
                <ActionMenu
                  iconColor={theme.colors.black.DEFAULT}
                  iconSize={25}
                  menuItems={getMenuItems("similarEvents", item)}
                  style={eventMenuStyle}
                />
              </View>
            )}
            style={{ marginTop: theme.spacing.lg }}
          />
          <View style={{ paddingBottom: 75 }} />
        </View>
      </NestableScrollContainer>
      <BottomActions
        style={{
          paddingBottom: 0,
          paddingRight: theme.spacing.xs,
        }}
      >
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleDiscard}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleReview}
        >
          Review
        </Button>
      </BottomActions>
    </Screen>
  );
};
