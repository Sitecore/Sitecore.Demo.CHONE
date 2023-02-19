import { useCallback } from 'react';
import { View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';

import { ActionMenu } from '../../features/ActionMenu/ActionMenu';
import { CardAvatar } from '../../features/CardAvatar/CardAvatar';
import { CardEvent } from '../../features/CardEvent/CardEvent';
import { ContentFieldMedia } from '../../features/ContentFieldMedia/ContentFieldMedia';
import { ContentFieldReference } from '../../features/ContentFieldReference/ContentFieldReference';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { Athlete } from '../../interfaces/athlete';
import { Event } from '../../interfaces/event';
import { theme } from '../../theme/theme';

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

export const ReferencesView = ({ stateKey }: { stateKey: string }) => {
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

  return (
    <NestableScrollContainer style={{ paddingHorizontal: theme.spacing.sm }}>
      <ContentFieldMedia
        fieldKey="featuredImage"
        fieldTitle="Featured Image"
        initialRoute="AddEvent"
        items={contentItems[stateKey].featuredImage}
        stateKey={stateKey}
        style={{ marginTop: theme.spacing.md }}
      />
      <ContentFieldMedia
        fieldKey="relatedMedia"
        fieldTitle="Related Media"
        initialRoute="AddEvent"
        items={contentItems[stateKey].relatedMedia}
        stateKey={stateKey}
        style={{ marginTop: theme.spacing.lg }}
      />
      <ContentFieldReference
        addRoute="AddAthletes"
        fieldKey="athletes"
        fieldTitle="Related Athletes"
        initialRoute="AddEvent"
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
        initialRoute="AddEvent"
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
      <View style={{ paddingBottom: 100 }} />
    </NestableScrollContainer>
  );
};
