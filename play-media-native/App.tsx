import React, { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import {
  configureFonts,
  MD3LightTheme,
  Portal,
  Provider as PaperProvider,
} from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Main } from "./features/Main/Main";
import { useFonts } from "expo-font";
import {
  paperColorConfig,
  paperFontConfig,
  paperRestConfig,
} from "./theme/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Redux global state
//
import { store } from "./store";
import { Provider as GlobalStateProvider } from "react-redux";

// Create a client
const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === "active");
}

const paperTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: paperFontConfig }),
  ...paperColorConfig,
  ...paperRestConfig,
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Saira-Regular": require("./assets/fonts/Saira-Regular.ttf"),
    "Saira-Medium": require("./assets/fonts/Saira-Medium.ttf"),
    "Saira-Bold": require("./assets/fonts/Saira-Bold.ttf"),
    "Saira-Italic": require("./assets/fonts/Saira-Italic.ttf"),
    "Roboto-Mono": require("./assets/fonts/RobotoMono-VariableFont_wght.ttf"),
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
    const subscription = AppState.addEventListener("change", onAppStateChange);
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
