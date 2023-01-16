import { useCallback, useEffect, useMemo } from "react";
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
import { ListingImages } from "../features/ListingImages/ListingImages";

const containerStyles = {
  height: "100%",
  backgroundColor: theme.colors.black.darkest,
  paddingTop: theme.spacing.xs,
  overflowY: "scroll",
};

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
    alignItems: "center",
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
    maxWidth: 300,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  cardLabel: {
    color: theme.colors.black.DEFAULT,
    fontWeight: "bold",
  },
});

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

  const actions = useMemo(
    () => (
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
          disabled={!media?.length}
          mode="contained"
          labelStyle={labelStyle}
          style={buttonStyle}
          onPress={onReview}
        >
          {media?.length ? `Add ${media.length} items` : `Add`}
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
      <View style={styles.flexContainer}>
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
      </View>
    );
  }

  return (
    <View style={styles.simpleContainer}>
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
      <Text style={{ ...styles.header, marginTop: theme.spacing.sm }}>
        Items Added
      </Text>
      <ListingImages images={media} />
      {actions}
    </View>
  );
};
