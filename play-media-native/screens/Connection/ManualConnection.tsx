import { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FormAddConnection } from '../../features/FormAddConnection/FormAddConnection';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';
import connectionStyles from './styles';

export const ManualConnectionScreen = ({ route }) => {
  const [connection] = useState(route?.params?.connection);

  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle="light-content" />
      <View style={connectionStyles.container}>
        <Text style={connectionStyles.title}>
          <Text>Add connection details to a</Text>
          <Text style={connectionStyles.chOneText}> Content Hub ONE</Text>
          <Text> instance.</Text>
        </Text>
      </View>
      <FormAddConnection initialValue={connection} />
    </KeyboardAwareScreen>
  );
};
