import { useState } from 'react';
import { StatusBar } from 'react-native';

import { FormAddConnection } from '../../features/FormAddConnection/FormAddConnection';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';

export const ManualConnectionScreen = ({ route }) => {
  const [connection] = useState(route?.params?.connection);

  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle="light-content" />
      <FormAddConnection initialValue={connection} />
    </KeyboardAwareScreen>
  );
};
