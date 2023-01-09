import React, { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { configureFonts, MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, QueryClient, QueryClientProvider } from "react-query";
import { Main } from "./components/Main/Main";
import { useFonts } from "expo-font";
import { paperColorConfig, paperFontConfig, paperRestConfig } from "./theme/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Create a client
const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === "active");
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "Saira-Regular": require("./assets/fonts/Saira-Regular.ttf"),
    "Saira-Medium": require("./assets/fonts/Saira-Medium.ttf"),
    "Saira-Bold": require("./assets/fonts/Saira-Bold.ttf"),
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

  const paperTheme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: paperFontConfig }),
    ...paperColorConfig,
    ...paperRestConfig,
  };

  // Needed for Expo font loading
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={paperTheme}>
          <Main />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
