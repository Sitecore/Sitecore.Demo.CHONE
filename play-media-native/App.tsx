import React, { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Main } from "./components/Main/Main";

// Create a client
const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === "active");
}

export default function App() {
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

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </QueryClientProvider>
  );
}
