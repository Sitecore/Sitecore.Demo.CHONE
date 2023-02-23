import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { Text } from 'react-native-paper';

import { DatePicker } from '../../components/DatePicker/DatePicker';
import { InputText } from '../../components/InputText/InputText';
import { RichTextEditor } from '../../components/RichTextEditor/RichTextEditor';
import { getDate } from '../../helpers/dateHelper';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { Athlete } from '../../interfaces/athlete';
import { Event } from '../../interfaces/event';
import { IIndexable } from '../../interfaces/indexable';
import { Sport } from '../../interfaces/sport';
import { theme } from '../../theme/theme';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { CardAvatar } from '../CardAvatar/CardAvatar';
import { CardEvent } from '../CardEvent/CardEvent';
import { ContentFieldMedia } from '../ContentFieldMedia/ContentFieldMedia';
import { ContentFieldReference } from '../ContentFieldReference/ContentFieldReference';

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

export const FieldsEvent = ({
  event,
  initialRoute,
  handleFieldChange,
  showLimitedFields,
  sports,
  stateKey,
}: {
  event: Event;
  initialRoute: string;
  handleFieldChange: () => void;
  requiredOnly: boolean;
  showLimitedFields: boolean;
  sports: Sport[];
  stateKey: string;
}) => {
  const { remove } = useContentItems();

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

  return (
    <NestableScrollContainer>
      <View>
        {showLimitedFields && (
          <>
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
            <ContentFieldReference
              addRoute="AddSport"
              fieldKey="sport"
              fieldTitle="Sport"
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
          </>
        )}
        <View style={inputContainerStyle}>
          <Text style={{ marginBottom: theme.spacing.xs }}>Body</Text>
          <RichTextEditor initialValue={body?.content} onChange={handleBodyChange} />
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
  );
};
