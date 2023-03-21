import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import { Text } from 'react-native-paper';

import { InputBoolean } from '../../components/InputBoolean/InputBoolean';
import { InputDate } from '../../components/InputDate/InputDate';
import { InputText } from '../../components/InputText/InputText';
import { RichTextEditor } from '../../components/RichTextEditor/RichTextEditor';
import { CONTENT_TYPES, CONTENT_TYPE_ROUTES, FIELD_TYPES } from '../../constants/contentTypes';
import { getNonRequiredOverrides, getRequiredOverrides } from '../../helpers/contentItemHelper';
import { useContentItems } from '../../hooks/useContentItems/useContentItems';
import { Athlete } from '../../interfaces/athlete';
import { IFieldOverride } from '../../interfaces/contentItem';
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
  top: 0,
  right: 0,
  zIndex: 12,
};

const eventMenuStyle = {
  position: 'absolute',
  top: 0,
  right: theme.spacing.sm,
  zIndex: 10,
};

const sectionMarginBottom = theme.spacing.xs;

export const ContentItemFields = ({
  initialRoute,
  overrides,
  stateKey,
  requiredOnly = false,
  showLimited = false,
  headerTitle = '',
}: {
  initialRoute: string;
  overrides: Record<string, IFieldOverride>;
  stateKey: string;
  requiredOnly?: boolean;
  showLimited?: boolean;
  headerTitle?: string;
}) => {
  const { contentItems, edit, remove } = useContentItems();

  const deleteItem = useCallback(
    (key: string, item: any) => {
      remove({ id: stateKey, key, value: item });
    },
    [remove, stateKey]
  );

  const getMenuItems = useCallback(
    (key: string, item: any) => [
      {
        icon: 'close',
        handler: () => deleteItem(key, item),
        title: 'Delete',
      },
    ],
    [deleteItem]
  );

  const handleFieldChange = useCallback(
    (key: string, value: any) => {
      edit({
        id: stateKey,
        key,
        value,
      });
    },
    [edit, stateKey]
  );

  const referenceRenderers = useCallback(
    (fieldKey: string) => ({
      [CONTENT_TYPES.ATHLETE]: (item: Athlete) => (
        <View style={{ position: 'relative' }}>
          <CardAvatar item={item} isDraggable />
          <ActionMenu
            iconColor={theme.colors.black.DEFAULT}
            iconSize={theme.sizing.menuIconSize}
            menuItems={getMenuItems(fieldKey, item)}
            style={athleteMenuStyle}
          />
        </View>
      ),
      [CONTENT_TYPES.EVENT]: (item: Event) => (
        <View style={{ position: 'relative' }}>
          <CardEvent item={item} isDraggable />
          <ActionMenu
            iconColor={theme.colors.black.DEFAULT}
            iconSize={theme.sizing.menuIconSize}
            menuItems={getMenuItems(fieldKey, item)}
            style={eventMenuStyle}
          />
        </View>
      ),
      [CONTENT_TYPES.SPORT]: (item: Sport) => (
        <View style={{ position: 'relative' }}>
          <CardSport item={item} />
          <ActionMenu
            iconColor={theme.colors.black.DEFAULT}
            iconSize={25}
            menuItems={getMenuItems(fieldKey, item)}
            style={athleteMenuStyle}
          />
        </View>
      ),
    }),
    [getMenuItems]
  );

  const fieldRenderers = useCallback(
    (state: IIndexable, componentKey: string) => ({
      [FIELD_TYPES.Boolean]: (fieldKey: string) => (
        <InputBoolean
          key={componentKey}
          onChange={(bool: boolean) => handleFieldChange(fieldKey, bool)}
          required={overrides[fieldKey].required}
          title={overrides[fieldKey].title}
          value={state[stateKey][fieldKey]}
        />
      ),
      [FIELD_TYPES.Date]: (fieldKey: string) => (
        <InputDate
          key={componentKey}
          onChange={(date: Date) => handleFieldChange(fieldKey, date)}
          required={overrides[fieldKey].required}
          title={overrides[fieldKey].title}
          value={state[stateKey][fieldKey]}
        />
      ),
      [FIELD_TYPES.LongText]: (fieldKey: string) => (
        <InputText
          key={componentKey}
          containerStyle={styles.inputContainer}
          multiline
          onChange={(text: string) => handleFieldChange(fieldKey, text)}
          required={overrides[fieldKey].required}
          title={overrides[fieldKey].title}
          value={state[stateKey][fieldKey]}
        />
      ),
      [FIELD_TYPES.Media]: (fieldKey: string) => (
        <ContentFieldMedia
          key={componentKey}
          fieldKey={fieldKey}
          fieldTitle={overrides[fieldKey].title}
          initialRoute={initialRoute}
          items={state[stateKey][fieldKey]}
          required={overrides[fieldKey].required}
          single={overrides[fieldKey].single}
          stateKey={stateKey}
          style={sectionMarginBottom}
          headerTitle={headerTitle}
        />
      ),
      [FIELD_TYPES.Number]: null,
      [FIELD_TYPES.Reference]: (fieldKey: string) => (
        <ContentFieldReference
          key={componentKey}
          addRoute={CONTENT_TYPE_ROUTES[overrides[fieldKey].referenceType]}
          fieldKey={fieldKey}
          fieldTitle={overrides[fieldKey].title}
          initialRoute={initialRoute}
          renderItem={referenceRenderers(fieldKey)[overrides[fieldKey].referenceType]}
          required={overrides[fieldKey].required}
          single={overrides[fieldKey].single}
          stateKey={stateKey}
          style={sectionMarginBottom}
          headerTitle={headerTitle}
        />
      ),
      [FIELD_TYPES.RichText]: (fieldKey: string) => (
        <View key={componentKey} style={styles.inputContainer}>
          <Text style={{ marginBottom: theme.spacing.xs }}>{overrides[fieldKey].title}</Text>
          <RichTextEditor
            initialValue={state[stateKey][fieldKey]?.content}
            onChange={(text: string) => handleFieldChange(fieldKey, text)}
          />
        </View>
      ),
      [FIELD_TYPES.ShortText]: (fieldKey: string) => (
        <InputText
          key={componentKey}
          containerStyle={styles.inputContainer}
          multiline
          onChange={(text: string) => handleFieldChange(fieldKey, text)}
          required={overrides[fieldKey].required}
          title={overrides[fieldKey].title}
          value={state[stateKey][fieldKey]}
        />
      ),
    }),
    [handleFieldChange, initialRoute, overrides, referenceRenderers, stateKey, headerTitle]
  );

  const filteredOverrides = useMemo(() => {
    if (!showLimited) {
      return overrides;
    }

    return requiredOnly ? getRequiredOverrides(overrides) : getNonRequiredOverrides(overrides);
  }, [overrides, requiredOnly, showLimited]);

  const showRequiredBanner = useMemo(() => {
    if (!showLimited) {
      return true;
    }

    if (requiredOnly) {
      return true;
    }

    return false;
  }, [requiredOnly, showLimited]);

  if (!stateKey || !contentItems[stateKey]) {
    return null;
  }

  return (
    <NestableScrollContainer>
      <View>
        {showRequiredBanner && <RequiredFieldsBanner />}
        {Object.entries(filteredOverrides).map(([overrideKey, override], index) => {
          const renderer = fieldRenderers(contentItems, `${overrideKey}-${index}`)[override.type];

          if (!renderer) {
            return null;
          }

          return renderer(overrideKey);
        })}
        <View style={{ paddingBottom: 75 }} />
      </View>
    </NestableScrollContainer>
  );
};
