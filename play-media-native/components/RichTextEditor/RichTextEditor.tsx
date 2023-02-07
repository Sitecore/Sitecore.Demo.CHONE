import { useRef, useState, MutableRefObject } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { RichText } from "../../features/RichText/RichText";
import { theme } from "../../theme/theme";
import generateJson from "./generateJson";

export const RichTextEditor = () => {
  const richText = useRef<any>();

  const [descHTML, setDescHTML] = useState("");
  const [descJSON, setDescJSON] = useState();
  const [showDescError, setShowDescError] = useState(false);

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
      setDescJSON(generateJson(descriptionText));

      console.log(descriptionText);
      console.log(generateJson(descriptionText).content);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = () => {
    if (!descHTML) {
      setShowDescError(true);
    } else {
      // send data to your server!
    }
  };

  const richTextDisplay = descJSON ? <RichText body={descJSON.content} /> : "";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Button
            onPress={() => {
              setDescJSON(generateJson(descHTML));
            }}
          >
            print text
          </Button>
          <RichEditor
            editorStyle={{
              backgroundColor: theme.colors.black.light,
              color: theme.colors.white.DEFAULT,
            }}
            initialHeight={400}
            ref={richText}
            onChange={(descriptionText) => {
              richTextHandle(descriptionText);
              submitContentHandle();
            }}
            // onCursorPosition={() => {
            //   richText.current.scrollTo({
            //     y: scrollY - 30,
            //     duration: 100,
            //     animated: true,
            //   });
            // }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <RichToolbar
        editor={richText}
        actions={[
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.heading4,
          actions.heading5,
          actions.heading6,
          actions.line,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={[{ color: tintColor }]}>H1</Text>
          ),
          [actions.heading2]: ({ tintColor }) => (
            <Text style={[{ color: tintColor }]}>H2</Text>
          ),
          [actions.heading3]: ({ tintColor }) => (
            <Text style={[{ color: tintColor }]}>H3</Text>
          ),
          [actions.heading4]: ({ tintColor }) => (
            <Text style={[{ color: tintColor }]}>H4</Text>
          ),
          [actions.heading5]: ({ tintColor }) => (
            <Text style={[{ color: tintColor }]}>H5</Text>
          ),
          [actions.heading6]: ({ tintColor }) => (
            <Text style={[{ color: tintColor }]}>H6</Text>
          ),
        }}
        selectedIconTint={theme.colors.blue.light}
        iconTint={theme.colors.black.DEFAULT}
        style={{
          ...styles.richTextToolbarStyle,
          borderColor: theme.colors.yellow.DEFAULT,
          borderWidth: 1,
        }}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.setStrikethrough,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.code,
          actions.blockquote,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }) => (
            <Text style={[{ color: tintColor }]}>H1</Text>
          ),
        }}
        selectedIconTint={theme.colors.blue.light}
        iconTint={theme.colors.black.DEFAULT}
        style={{
          ...styles.richTextToolbarStyle,
          borderTopLeftRadius: theme.spacing.xs,
          borderTopRightRadius: theme.spacing.xs,
        }}
      />
      {richTextDisplay}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    flexDirection: "column-reverse",
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
  },

  richTextEditorStyle: {
    backgroundColor: theme.colors.white.DEFAULT,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.black.DEFAULT,
    shadowColor: theme.colors.black.DEFAULT,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: theme.colors.yellow.DEFAULT,
    color: theme.colors.black.DEFAULT,
  },
});
