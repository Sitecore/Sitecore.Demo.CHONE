import { useCallback } from 'react';
import { View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { Text } from 'react-native-paper';

import { InputBoolean } from '../../components/InputBoolean/InputBoolean';
import { InputDate } from '../../components/InputDate/InputDate';
import { InputText } from '../../components/InputText/InputText';
import { RichTextEditor } from '../../components/RichTextEditor/RichTextEditor';
import { EVENT_FIELD_OVERRIDES } from '../../constants/event';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { Athlete } from '../../interfaces/athlete';
import { Event } from '../../interfaces/event';
import { IIndexable } from '../../interfaces/indexable';
import { Sport } from '../../interfaces/sport';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { CardAvatar } from '../CardAvatar/CardAvatar';
import { CardEvent } from '../CardEvent/CardEvent';
import { CardSport } from '../CardSport/CardSport';
import { ContentFieldMedia } from '../ContentFieldMedia/ContentFieldMedia';
import { ContentFieldReference } from '../ContentFieldReference/ContentFieldReference';
import { RequiredFieldsBanner } from '../RequiredFieldsBanner/RequiredFieldsBanner';

const athleteMenuStyle = {
  position: 'absolute',
  bottom: 10,
  right: 0,
  zIndex: 12,
};

const eventMenuStyle = {
  position: 'absolute',
  bottom: 20,
  right: 18,
  zIndex: 10,
};

const sectionMarginBottom = theme.spacing.xs;

export const FieldsEvent = ({
  event,
  fields,
  initialRoute,
  handleFieldChange,
  showLimitedFields = false,
  stateKey,
}: {
  event?: Event;
  fields: IIndexable;
  initialRoute: string;
  handleFieldChange: (key: string, value: any) => void;
  showLimitedFields?: boolean;
  stateKey: string;
}) => {
  const { contentItems, remove } = useContentItems();

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

  if (!contentItems[stateKey]) {
    return null;
  }

  return (
    <NestableScrollContainer>
      <View>
        <RequiredFieldsBanner />
        <InputText
          containerStyle={styles.inputContainer}
          multiline
          onChange={(text: string) => handleFieldChange('title', text)}
          required={EVENT_FIELD_OVERRIDES?.title?.required}
          value={fields.title}
          title="Title"
        />
        <ContentFieldReference
          addRoute="AddSport"
          fieldKey="sport"
          fieldTitle="Sport"
          initialRoute={initialRoute}
          renderItem={(item: Sport) => (
            <View style={{ position: 'relative' }}>
              <CardSport item={item} />
              <ActionMenu
                iconColor={theme.colors.black.DEFAULT}
                iconSize={25}
                menuItems={getMenuItems('sport', item)}
                style={athleteMenuStyle}
              />
            </View>
          )}
          required={EVENT_FIELD_OVERRIDES?.sport?.required}
          single={EVENT_FIELD_OVERRIDES?.sport?.single}
          stateKey={stateKey}
          style={sectionMarginBottom}
        />
        {!showLimitedFields && (
          <>
            <InputBoolean
              onChange={(bool: boolean) => handleFieldChange('isFeatured', bool)}
              required={EVENT_FIELD_OVERRIDES?.isFeatured?.required}
              title="Is Featured?"
              value={fields.isFeatured}
            />
            <InputText
              containerStyle={styles.inputContainer}
              multiline
              onChange={(text: string) => handleFieldChange('teaser', text)}
              required={EVENT_FIELD_OVERRIDES?.teaser?.required}
              title="Teaser"
              value={event.teaser}
            />
            <InputDate
              onChange={(date: Date) => handleFieldChange('timeAndDate', date)}
              required={EVENT_FIELD_OVERRIDES?.timeAndDate?.required}
              title="Time and Date"
              value={fields.timeAndDate}
            />
            <InputText
              containerStyle={styles.inputContainer}
              multiline
              onChange={(text: string) => handleFieldChange('location', text)}
              required={EVENT_FIELD_OVERRIDES?.location?.required}
              title="Location"
              value={fields.location}
            />
            <View style={styles.inputContainer}>
              <Text style={{ marginBottom: theme.spacing.xs }}>Body</Text>
              <RichTextEditor
                initialValue={fields?.body?.content}
                onChange={(text: string) => handleFieldChange('body', text)}
              />
            </View>
            <ContentFieldMedia
              fieldKey="featuredImage"
              fieldTitle="Featured Image"
              initialRoute={initialRoute}
              items={event?.featuredImage}
              required={EVENT_FIELD_OVERRIDES?.featuredImage?.required}
              single={EVENT_FIELD_OVERRIDES?.featuredImage?.single}
              stateKey={stateKey}
              style={sectionMarginBottom}
            />
            <ContentFieldMedia
              fieldKey="relatedMedia"
              fieldTitle="Related Media"
              initialRoute={initialRoute}
              items={event.relatedMedia}
              required={EVENT_FIELD_OVERRIDES?.relatedMedia?.required}
              single={EVENT_FIELD_OVERRIDES?.relatedMedia?.single}
              stateKey={stateKey}
              style={sectionMarginBottom}
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
              required={EVENT_FIELD_OVERRIDES?.athletes?.required}
              single={EVENT_FIELD_OVERRIDES?.athletes?.single}
              stateKey={stateKey}
              style={sectionMarginBottom}
            />
            <ContentFieldReference
              addRoute="AddEvents"
              fieldKey="similarEvents"
              fieldTitle="Related Events"
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
              required={EVENT_FIELD_OVERRIDES?.similarEvents?.required}
              single={EVENT_FIELD_OVERRIDES?.similarEvents?.single}
              stateKey={stateKey}
              style={sectionMarginBottom}
            />
          </>
        )}
        <View style={{ paddingBottom: 75 }} />
      </View>
    </NestableScrollContainer>
  );
};
