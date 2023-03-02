import { FIELD_OVERRIDES_ATHLETE } from '../../constants/athlete';
import { ContentItemFields } from '../ContentItemFields/ContentItemFields';

export const FieldsAthlete = ({
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
      overrides={FIELD_OVERRIDES_ATHLETE}
      requiredOnly={requiredOnly}
      showLimited={showLimited}
      stateKey={stateKey}
    />
  );
};
