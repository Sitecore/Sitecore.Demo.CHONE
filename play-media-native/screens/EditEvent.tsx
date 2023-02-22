import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { Button, Text } from 'react-native-paper';
import { useQuery } from 'react-query';

import { getAllSports } from '../api/queries/getSports';
import { BottomActions } from '../components/BottomActions/BottomActions';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { InputText } from '../components/InputText/InputText';
import { RichTextEditor } from '../components/RichTextEditor/RichTextEditor';
import { ActionMenu } from '../features/ActionMenu/ActionMenu';
import { CardAvatar } from '../features/CardAvatar/CardAvatar';
import { CardEvent } from '../features/CardEvent/CardEvent';
import { ContentFieldMedia } from '../features/ContentFieldMedia/ContentFieldMedia';
import { ContentFieldReference } from '../features/ContentFieldReference/ContentFieldReference';
import { LoadingScreen } from '../features/LoadingScreen/LoadingScreen';
import { Screen } from '../features/Screen/Screen';
import { SportPicker } from '../features/SportPicker/SportPicker';
import { getDate } from '../helpers/dateHelper';
import { useContentItems } from '../hooks/useContentItems/useContentItems';
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

const initialRoute = 'EditEvent';

export const EditEventScreen = ({ navigation, route }) => {
  const [stateKey] = useState(route?.params?.stateKey);
  const { contentItems, editMultiple, remove, reset } = useContentItems();

  const event = useMemo(
    () => contentItems[stateKey] ?? null,
    [contentItems, stateKey]
  ) as unknown as Event;

  const { data: sports, isFetching: isFetchingSports } = useQuery('sports', () => getAllSports());
  const defaultSport = useMemo(() => {
    const hasSport = !!event?.sport;
    const sportsFetched = !!sports?.length;

    if (hasSport) {
      return event.sport;
    }

    if (!hasSport && sportsFetched) {
      return sports[0];
    }

    return null;
  }, [event, sports]);

  const [title, setTitle] = useState(event?.title);
  const [sport, setSport] = useState<Sport>(defaultSport);
  const [teaser, setTeaser] = useState(event?.teaser);
  const [date, setDate] = useState(event?.timeAndDate || new Date());
  const [location, setLocation] = useState(event?.location);
  const [body, setBody] = useState<any>(event?.body);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBodyChange = useCallback((json: string) => setBody(json), []);

  const deleteItem = useCallback(
    (key: string, item: any) => {
      remove({ id: stateKey, key, value: item });
    },
    [remove, stateKey]
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
    editMultiple({
      id: stateKey,
      fields: {
        body,
        location,
        sport: sport || sports[0],
        teaser,
        timeAndDate: date,
        title,
      },
    });

    navigation.navigate('ReviewEvent', {
      stateKey,
      title: `Review ${title || 'Event'}`,
    });
  }, [body, date, editMultiple, location, navigation, sport, sports, stateKey, teaser, title]);

  const handleDiscard = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: event?.title || 'Edit Event',
    });
  }, [event?.title, navigation]);

  // reset global state on unmount
  //
  useEffect(() => {
    return () => {
      reset({ id: stateKey });
    };
  }, [reset, stateKey]);

  if (isFetchingSports) {
    return <LoadingScreen />;
  }

  if (!event && !isFetchingSports) {
    return <Text>Event not available!</Text>;
  }

  return (
    <Screen>
      <NestableScrollContainer>
        <View>
          <SportPicker
            onChange={handleSportChange}
            sports={sports}
            initialValue={defaultSport?.title}
          />
          <InputText
            containerStyle={inputContainerStyle}
            multiline
            onChange={setTitle}
            value={title}
            title="Title"
          />
          <InputText
            containerStyle={inputContainerStyle}
            multiline
            onChange={setTeaser}
            value={teaser}
            title="Teaser"
          />
          <Pressable onPress={() => setShowDatePicker(true)}>
            <View pointerEvents="none">
              <InputText
                containerStyle={inputContainerStyle}
                value={getDate(date)}
                title="Event Date"
                showSoftInputOnFocus={false}
                caretHidden
              />
            </View>
          </Pressable>
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
            title="Location"
          />
          <View style={inputContainerStyle}>
            <Text style={{ marginBottom: theme.spacing.xs }}>Body</Text>
            <RichTextEditor initialValue={event?.body?.content} onChange={handleBodyChange} />
          </View>
          <ContentFieldMedia
            fieldKey="featuredImage"
            fieldTitle="Featured Image"
            initialRoute={initialRoute}
            items={event.featuredImage}
            stateKey={stateKey}
            style={{ marginTop: theme.spacing.md }}
          />
          <ContentFieldMedia
            fieldKey="relatedMedia"
            fieldTitle="Related Media"
            initialRoute={initialRoute}
            items={event.relatedMedia}
            stateKey={stateKey}
            style={{ marginTop: theme.spacing.lg }}
          />
          <ContentFieldReference
            addRoute="AddAthletes"
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
            stateKey={stateKey}
            style={{ marginTop: theme.spacing.lg }}
          />
          <ContentFieldReference
            addRoute="AddEvents"
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
            stateKey={stateKey}
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
