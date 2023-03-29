import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';

import { FormAddConnection } from '../../features/FormAddConnection/FormAddConnection';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';
import { Connection } from '../../interfaces/connections';
import { RootStackParamList } from '../../interfaces/navigators';

type Props = NativeStackScreenProps<RootStackParamList, 'ManualConnection'>;

export const ManualConnectionScreen = ({ navigation, route }: Props) => {
  const [connection] = useState<Connection>(route?.params?.connection);
  const [isEdit] = useState(route?.params?.isEdit);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (event) => {
        event.preventDefault();

        navigation.push('ManualConnectionDiscard', {
          isEdit,
          title: connection?.name || 'Untitled connection',
          subtitle: isEdit ? 'Discard connection?' : 'Discard new connection?',
        });
      });

      return () => {
        unsubscribe();
      };
    }, [connection?.name, isEdit, navigation])
  );

  return (
    <KeyboardAwareScreen centered>
      <StatusBar barStyle="light-content" />
      <FormAddConnection initialValue={connection} isEdit={isEdit} />
    </KeyboardAwareScreen>
  );
};
