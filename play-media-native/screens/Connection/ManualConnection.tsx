import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StatusBar } from 'react-native';

import { FormAddConnection } from '../../features/FormAddConnection/FormAddConnection';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';
import { Connection } from '../../interfaces/connections';
import { RootStackParamList } from '../../interfaces/navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'ManualConnection'>;

export const ManualConnectionScreen = ({ navigation, route }: Props) => {
  const [connection] = useState<Connection>(route?.params?.connection);

  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle="light-content" />
      <FormAddConnection initialValue={connection} />
    </KeyboardAwareScreen>
  );
};
