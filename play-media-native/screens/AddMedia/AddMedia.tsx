import { useCallback, useEffect, useMemo } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/theme";
import { StackNavigationProp } from "../../interfaces/navigators";
import { Icon } from "../../components/Icon/Icon";
import { DeviceMedia } from "../../interfaces/media";
import { useMedia } from "../../hooks/useMedia/useMedia";
import { BottomActions } from "../../components/BottomActions/BottomActions";
import { ListingAddedMedia } from "./ListingAddedMedia";
import { MEDIA_SOURCES } from "../../constants/media";
import { Screen } from "../../features/Screen/Screen";
import { styles as themeStyles } from "../../theme/styles";

const containerStyles = {
  height: "100%",
  backgroundColor: theme.colors.black.darkest,
  paddingTop: theme.spacing.xs,
};

const cardStyle = {
  paddingHorizontal: theme.spacing.xs,
  margin: theme.spacing.xs,
  backgroundColor: theme.colors.yellow.DEFAULT,
};

const styles = StyleSheet.create({
  flexContainer: {
    justifyContent: "center",
    alignItems: "center",
    ...containerStyles,
  },
  simpleContainer: {
    // alignItems: "center",
    ...containerStyles,
  },
  card: {
    ...cardStyle,
    width: 250,
  },
  cardCompact: {
    ...cardStyle,
    flex: 1,
  },
  cardContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    color: theme.colors.white.DEFAULT,
    textAlign: "center",
    marginBottom: theme.spacing.xxs,
  },
  cardLabel: {
    color: theme.colors.black.DEFAULT,
    fontWeight: "bold",
  },
});

export const AddMediaScreen = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const { add, clear, media } = useMedia();
  const [status, requestPermissions] = useCameraPermissions();

  const initImage = useCallback(
    (image: DeviceMedia) => {
      if (!image) {
        return;
      }
      navigation.navigate("EditMedia", { image });
    },
    [navigation]
  );

  const handleLaunchCamera = useCallback(async () => {
    await requestPermissions();

    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return null;
    } else {
      initImage({ ...result.assets[0], source: MEDIA_SOURCES.CAMERA });
    }
  }, [initImage, requestPermissions]);

  const handleImageLibrary = useCallback(async () => {
    await requestPermissions();

    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return null;
    } else {
      initImage({ ...result.assets[0], source: MEDIA_SOURCES.LIBRARY });
    }
  }, [initImage, requestPermissions]);

  const handleRemoteMedia = useCallback(async () => {
    navigation.navigate("AddCH1Media");
  }, [navigation]);

  const onDiscard = useCallback(() => {
    clear();
    navigation.goBack();
  }, [clear, navigation]);

  const onReview = useCallback(() => {}, [navigation]);

  const actions = useMemo(
    () => (
      <BottomActions>
        <Button
          mode="outlined"
          style={themeStyles.button}
          labelStyle={themeStyles.buttonLabel}
          onPress={onDiscard}
        >
          Discard
        </Button>
        <Button
          disabled={!media?.length}
          mode="contained"
          style={themeStyles.button}
          labelStyle={themeStyles.buttonLabel}
          onPress={onReview}
        >
          {media?.length ? `Add ${media.length}` : `Add`}
        </Button>
      </BottomActions>
    ),
    [onDiscard, onReview, media]
  );

  useEffect(() => {
    const requestUserPermission = async () => {
      await requestPermissions();
    };

    requestUserPermission();
  }, []);

  if (!media?.length) {
    return (
      <Screen centered>
        <Text style={styles.header}>Select the media source</Text>
        <Card mode="contained" onPress={handleLaunchCamera} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="camera-outline" />
            <Text style={styles.cardLabel} variant="headlineSmall">
              Camera
            </Text>
          </Card.Content>
        </Card>
        <Card mode="contained" onPress={handleImageLibrary} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="folder-open-outline" />
            <Text style={styles.cardLabel} variant="headlineSmall">
              Device Library
            </Text>
          </Card.Content>
        </Card>
        <Card mode="contained" onPress={handleRemoteMedia} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Icon name="apps-outline" />
            <Text style={styles.cardLabel} variant="headlineSmall">
              Content Hub One
            </Text>
          </Card.Content>
        </Card>
        {actions}
      </Screen>
    );
  }

  return (
    <Screen>
      <StatusBar barStyle={"light-content"} />
      <Text style={styles.header}>Select the media source</Text>
      <View style={{ flexDirection: "row" }}>
        <Card
          mode="contained"
          onPress={handleLaunchCamera}
          style={styles.cardCompact}
        >
          <Card.Content style={styles.cardContent}>
            <Icon name="camera-outline" />
            <Text style={styles.cardLabel} variant="labelMedium">
              Camera
            </Text>
          </Card.Content>
        </Card>
        <Card
          mode="contained"
          onPress={handleImageLibrary}
          style={styles.cardCompact}
        >
          <Card.Content style={styles.cardContent}>
            <Icon name="folder-open-outline" />
            <Text style={styles.cardLabel} variant="labelMedium">
              Device
            </Text>
          </Card.Content>
        </Card>
        <Card
          mode="contained"
          onPress={handleRemoteMedia}
          style={styles.cardCompact}
        >
          <Card.Content style={styles.cardContent}>
            <Icon name="apps-outline" />
            <Text style={styles.cardLabel} variant="labelMedium">
              CH One
            </Text>
          </Card.Content>
        </Card>
      </View>
      <Text style={{ ...styles.header, marginTop: theme.spacing.xs }}>
        Items Added
      </Text>
      <ListingAddedMedia images={media} />
      {actions}
    </Screen>
  );
};
