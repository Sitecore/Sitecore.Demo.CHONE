import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/theme";
import { StackNavigationProp } from "../interfaces/navigators";
import { Icon } from "../components/Icon/Icon";
import { DeviceMedia } from "../interfaces/media";
import { useMedia } from "../hooks/useMedia/useMedia";
import { BottomActions } from "../components/BottomActions/BottomActions";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: theme.colors.black.darkest,
    paddingTop: theme.spacing.xs,
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

const buttonStyle = {
  borderWidth: 1,
  borderColor: theme.colors.yellow.DEFAULT,
  marginHorizontal: theme.spacing.xs,
};

const labelStyle = {
  fontFamily: theme.fontFamily.medium,
  fontSize: theme.fontSize.base,
  lineHeight: 30,
};

export const AddMediaScreen = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const { add, clear, clearTemp, editTemp, media, temp } = useMedia();
  const [status, requestPermissions] = useCameraPermissions();

  const editImage = useCallback(
    (image: DeviceMedia) => {
      if (!image) {
        return;
      }

      editTemp({
        fileUrl: image.uri,
        fileHeight: image.height,
        fileWidth: image.width,
      });
      navigation.navigate("EditMedia");
    },
    [editTemp, navigation]
  );

  const handleLaunchCamera = useCallback(async () => {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result.assets[0]", result.assets[0]);

    const image = !result.canceled ? result.assets[0] : null;
    editImage(image);
  }, [editImage]);

  const handleImageLibrary = useCallback(async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result.assets[0]", result.assets[0]);

    const image = !result.canceled ? result.assets[0] : null;
    editImage(image);
  }, [editImage]);

  const handleRemoteMedia = useCallback(async () => {
    navigation.navigate("AddCH1Media");
  }, [navigation]);

  const onDiscard = useCallback(() => {
    clear();
    navigation.goBack();
  }, [clear, navigation]);

  const onReview = useCallback(() => {
    navigation.navigate("ReviewMedia");
  }, [navigation]);

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

  console.log("\n");
  console.log("temp", temp);
  console.log("media", media);
  console.log("\n");

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
      <BottomActions>
        <Button
          mode="outlined"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onDiscard}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onReview}
        >
          Review Changes
        </Button>
      </BottomActions>
    </View>
  );
};
