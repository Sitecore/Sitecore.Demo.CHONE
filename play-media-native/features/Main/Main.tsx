import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

import { getConnections } from '../../helpers/connections';
import { useConnections } from '../../hooks/useConnections/useConnections';
import { Stacks } from '../../navigators/Stacks';
import { Screen } from '../Screen/Screen';

export const Main = () => {
  const { init } = useConnections();

  // Initalize global state on app load
  //
  useEffect(() => {
    const initializeConnections = async () => {
      const connections = await getConnections();
      init(connections);
    };

    initializeConnections();
  }, [init]);

  return (
    <NavigationContainer>
      <Screen>
        <Stacks />
      </Screen>
    </NavigationContainer>
  );
};
