import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { Button, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllSports } from '../api/queries/getSports';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { InputText } from '../components/InputText/InputText';
import { RichTextEditor } from '../components/RichTextEditor/RichTextEditor';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { ActionMenu } from '../features/ActionMenu/ActionMenu';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { ContentFieldMedia } from '../features/ContentFieldMedia/ContentFieldMedia';
import { ContentFieldReference } from '../features/ContentFieldReference/ContentFieldReference';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { SportPicker } from '../features/SportPicker/SportPicker';
import { getDate } from '../helpers/dateHelper';
import { useEventFields } from '../hooks/useEventFields/useEventFields';
import { Athlete } from '../interfaces/athlete';
import { Event } from '../interfaces/event';
import { Sport } from '../interfaces/sport';
import { styles } from '../theme/styles';
import { theme } from '../theme/theme';

const inputContainerStyle = {
  marginBottom: theme.spacing.sm,
};

const athleteMenuStyle = {
  position: 'absolute',
  bottom: 15,
  right: 0,
  zIndex: 12,
};

const eventMenuStyle = {
  position: 'absolute',
  bottom: 20,
  right: 18,
  zIndex: 10,
};

const contentType = CONTENT_TYPES.EVENT;
const initialRoute = 'EditEvent';

export const EditEventScreen = ({ route, navigation }) => {
  const { eventFields: event, edit, remove } = useEventFields();
  const { data: sports, isFetching: isFetchingSports } = useQuery('sports', () => getAllSports());
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
  const [date, setDate] = useState(new Date());
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
        icon: 'delete-outline',
        handler: () => deleteItem(key, item),
        title: 'Delete',
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
    navigation.navigate('ReviewEvent', {
      title: 'Review edited event',
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
  }, [navigation, event, body, location, sport, sports, summary, date, title, defaultSport]);

  const handleDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: event?.title || 'Edit Event',
    });
  }, [event?.title, navigation]);

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
    }, [edit, event, route.params.image, route.params?.isEditMedia, route.params.key])
  );

  console.log('event', event);

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
          <SportPicker onChange={handleSportChange} sports={sports} initialValue={defaultSport} />

          <InputText
            containerStyle={inputContainerStyle}
            onChange={setTitle}
            value={title}
            title="Title"
          />
          <InputText
            containerStyle={inputContainerStyle}
            onChange={setSummary}
            value={summary}
            title="Teaser"
          />
          <InputText
            containerStyle={inputContainerStyle}
            value={getDate(date)}
            title="Event Date"
            showSoftInputOnFocus={false}
            caretHidden
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
            onChange={setLocation}
            value={location}
            title="Location"
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
            addRoute="AddAthletes"
            contentType={contentType}
            createRoute="AddAthlete"
            fieldKey="athletes"
            fieldTitle="Related Athletes"
            initialRoute={initialRoute}
            renderItem={(item: Athlete) => (
              <View style={{ position: 'relative' }}>
                <CardAvatar item={item} />
                <ActionMenu
                  iconColor={theme.colors.black.DEFAULT}
                  iconSize={25}
                  menuItems={getMenuItems('athletes', item)}
                  style={athleteMenuStyle}
                />
              </View>
            )}
            style={{ marginTop: theme.spacing.lg }}
          />
          <ContentFieldReference
            addRoute="AddEvents"
            contentType={contentType}
            createRoute="AddEvent"
            fieldKey="similarEvents"
            fieldTitle="Similar Events"
            initialRoute={initialRoute}
            renderItem={(item: Event) => (
              <View style={{ position: 'relative' }}>
                <CardEvent item={item} />
                <ActionMenu
                  iconColor={theme.colors.black.DEFAULT}
                  iconSize={25}
                  menuItems={getMenuItems('similarEvents', item)}
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
