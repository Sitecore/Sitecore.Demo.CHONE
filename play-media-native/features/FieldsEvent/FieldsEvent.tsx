import { FIELD_OVERRIDES_EVENT } from '../../constants/event';
import { ContentItemFields } from '../ContentItemFields/ContentItemFields';

export const FieldsEvent = ({
  initialRoute,
  requiredOnly,
  showLimited = false,
  stateKey,
}: {
  initialRoute: string;
  requiredOnly?: boolean;
  showLimited?: boolean;
  stateKey: string;
}) => {
  return (
    <ContentItemFields
      initialRoute={initialRoute}
      overrides={FIELD_OVERRIDES_EVENT}
      requiredOnly={requiredOnly}
      showLimited={showLimited}
      stateKey={stateKey}
    />
  );
};
