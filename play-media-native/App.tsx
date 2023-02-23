import NetInfo from '@react-native-community/netinfo';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { configureFonts, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { focusManager, onlineManager, QueryClient, QueryClientProvider } from 'react-query';
import { Provider as GlobalStateProvider } from 'react-redux';

import { Main } from './features/Main/Main';
import { store } from './store';
import { paperColorConfig, paperFontConfig, paperRestConfig } from './theme/theme';

// Redux global state
//

if (__DEV__) {
  const ignoreWarns = ['VirtualizedLists should never be nested inside plain ScrollViews'];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

const paperTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: paperFontConfig }),
  ...paperColorConfig,
  ...paperRestConfig,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Saira-Regular': require('./assets/fonts/Saira-Regular.ttf'),
    'Saira-Medium': require('./assets/fonts/Saira-Medium.ttf'),
    'Saira-Bold': require('./assets/fonts/Saira-Bold.ttf'),
    'Saira-Italic': require('./assets/fonts/Saira-Italic.ttf'),
    'Roboto-Mono': require('./assets/fonts/RobotoMono-VariableFont_wght.ttf'),
  });

  // Auto refetch on re-connect
  //
  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(state.isConnected);
      });
    });
  }, []);

  // Refetch on app focus
  //
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  // Needed for Expo font loading
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaProvider>
      <GlobalStateProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={paperTheme}>
            <Main />
          </PaperProvider>
        </QueryClientProvider>
      </GlobalStateProvider>
    </SafeAreaProvider>
  );
}
