import { NavigationContainer } from '@react-navigation/native';

import { Stacks } from '../../navigators/Stacks';
import { Screen } from '../Screen/Screen';

export const Main = () => {
  return (
    <NavigationContainer>
      <Screen>
        <Stacks />
      </Screen>
    </NavigationContainer>
  );
};
