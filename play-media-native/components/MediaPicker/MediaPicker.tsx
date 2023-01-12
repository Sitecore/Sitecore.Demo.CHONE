import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "../../interfaces/navigators";
import { theme } from "../../theme/theme";
import { Icon } from "../Icon/Icon";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  card: {
    paddingHorizontal: theme.spacing.xs,
    margin: theme.spacing.xs,
    backgroundColor: theme.colors.yellow.DEFAULT,
    width: 250,
  },
  cardContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    maxWidth: 300,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  label: {
    color: theme.colors.black.DEFAULT,
    fontWeight: "bold",
  },
});

export const MediaPicker = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const [images, setImages] = useState(null);
  const [status, requestPermissions] = useCameraPermissions();

  const handleLaunchCamera = async () => {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets[0].uri);
    }
  };

  const handleImageLibrary = useCallback(async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets[0].uri);
    }
  }, []);

  const handleRemoteMedia = useCallback(async () => {
    navigation.navigate("AddCH1Media");
  }, []);

  useEffect(() => {
    const requestUserPermission = async () => {
      await requestPermissions();
    };

    requestUserPermission();
  }, []);

  // TODO: handle permissions
  //
  // If user has rejected and wants to enable permissions,
  // they must navigate to a Settings screen, which would
  // probably be accessible from TabScreebHeader three dot menu
  //   if (!permission) {
  //   }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select the media source</Text>
      <Card mode="contained" onPress={handleLaunchCamera} style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Icon name="camera-outline" />
          <Text style={styles.label} variant="headlineSmall">
            Camera
          </Text>
        </Card.Content>
      </Card>
      <Card mode="contained" onPress={handleImageLibrary} style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Icon name="folder-open-outline" />
          <Text style={styles.label} variant="headlineSmall">
            Device Library
          </Text>
        </Card.Content>
      </Card>
      <Card mode="contained" onPress={handleRemoteMedia} style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Icon name="apps-outline" />
          <Text style={styles.label} variant="headlineSmall">
            Content Hub One
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};
