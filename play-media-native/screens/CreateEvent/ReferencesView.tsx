import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "../../interfaces/navigators";
import { styles } from "../../theme/styles";
import { DraggableList } from "../../components/DraggableList/DraggableList";
import { Athlete } from "../../interfaces/athlete";
import { CardAvatar } from "../../features/CardAvatar/CardAvatar";
import { useEventFields } from "../../hooks/useEventFields/useEventFields";
import { MediaItemListDisplay } from "../../features/MediaItemListDisplay/MediaItemListDisplay";
import { DeviceMedia, Media } from "../../interfaces/media";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCamera } from "../../hooks/useCamera/useCamera";
import { useTempMedia } from "../../hooks/useTempMedia/useTempMedia";
import { CardEvent } from "../../features/CardEvent/CardEvent";
import { Event } from "../../interfaces/event";

export const ReferencesView = () => {
  const { eventFields } = useEventFields();
  const { launch } = useCamera();
  const navigation = useNavigation<StackNavigationProp>();

  const handleCameraPress = useCallback(
    (stateKey: string) => {
      launch((image: DeviceMedia) => {
        navigation.navigate("EditMedia", {
          initialRoute: "AddEvent",
          image,
          key: stateKey,
        });
      });
    },
    [launch, navigation]
  );

  const onAddMedia = useCallback(() => {
    navigation.navigate("AddCH1Media");
  }, []);

  const onAddAthletes = useCallback(() => {
    navigation.navigate("AddAthletes", { key: "athletes" });
  }, []);

  const onAddEvents = useCallback(() => {
    navigation.navigate("AddEvents", { key: "relatedEvents" });
  }, []);

  console.log("\n\neventFields", eventFields);

  return (
    <NestableScrollContainer>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          compact
          mode="outlined"
          onPress={() => handleCameraPress("relatedMedia")}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Camera
        </Button>
        <Button
          compact
          mode="outlined"
          onPress={onAddMedia}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Device
        </Button>
        <Button
          compact
          mode="contained"
          onPress={onAddMedia}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          CH ONE
        </Button>
      </View>
      <GestureHandlerRootView>
        <DraggableList
          items={eventFields.relatedMedia}
          renderItem={(item: Media) => <MediaItemListDisplay item={item} />}
        />
      </GestureHandlerRootView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          icon="plus"
          mode="contained"
          onPress={onAddAthletes}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Athletes
        </Button>
      </View>
      <GestureHandlerRootView>
        <DraggableList
          items={eventFields.athletes}
          renderItem={(item: Athlete) => <CardAvatar item={item} />}
        />
      </GestureHandlerRootView>
      <Button
        icon="plus"
        mode="contained"
        onPress={onAddEvents}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Events
      </Button>
      <GestureHandlerRootView>
        <DraggableList
          items={eventFields.relatedEvents}
          renderItem={(item: Event) => <CardEvent item={item} />}
        />
      </GestureHandlerRootView>
    </NestableScrollContainer>
  );
};
