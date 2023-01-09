import { useCallback, useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { validateConnection } from "../../api/queries/validateConnection";
import { useConnections } from "../../hooks/useConnections/useConnections";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Toast } from "../../components/Toast/Toast";

const defaultTextInputStyle = {
  width: "90%",
  marginVertical: 5,
};

// Connection name: allow only letters, numbers and hyphens.
//
const isNameValid = (text: string) => /^[a-z0-9-]+$/i.test(text);

const isApiKeyValid = (text: string) => !!text;

const isPreviewUrlValid = (text: string) => {
  const startsCorrectly = text.startsWith("https://");
  const endsCorrectly = text.endsWith("/api/content/v1/preview/graphql/");

  return startsCorrectly && endsCorrectly;
};

export const FormAddConnection = () => {
  const { add } = useConnections();
  const [validating, setValidating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewUrlError, setPreviewUrlError] = useState(false);

  const onAddConnection = useCallback(async () => {
    setValidating(true);

    const isValid = await validateConnection({ apiKey, previewUrl })
      .catch(() => {
        setShowToast(true);
      })
      .finally(() => {
        setValidating(false);
      });

    if (isValid) {
      add({
        name,
        apiKey,
        previewUrl,
      });
    }
  }, [name, apiKey, previewUrl, add]);

  const onToastDismiss = useCallback(() => {
    setShowToast(false);
  }, []);

  const handleName = useCallback((text: string) => {
    setNameError(!isNameValid(text));
    setName(text);
  }, []);

  const handleApiKey = useCallback((text: string) => {
    setApiKeyError(!isApiKeyValid(text));
    setApiKey(text);
  }, []);

  const handlePreviewUrl = useCallback((text: string) => {
    setPreviewUrlError(!isPreviewUrlValid(text));
    setPreviewUrl(text);
  }, []);

  // console.log("\n");
  // console.log("isNameValid('Abc12')", isNameValid("Abc12"));
  // console.log("isNameValid('Abc12-')", isNameValid("Abc12-"));
  // console.log("isNameValid('Abc12_')", isNameValid("Abc12_"));
  // console.log("isNameValid('Abc12!')", isNameValid("Abc12!"));

  return (
    <>
      <InputText
        containerStyle={defaultTextInputStyle}
        disabled={validating}
        error={nameError}
        errorText="Name should contain only letters, numbers and hyphens!"
        label="Connection name"
        onChange={handleName}
        value={name}
      />
      <InputText
        containerStyle={defaultTextInputStyle}
        disabled={validating}
        error={apiKeyError}
        errorText="API key should not be empty!"
        label="API Key"
        onChange={handleApiKey}
        value={apiKey}
      />
      <InputText
        containerStyle={defaultTextInputStyle}
        disabled={validating}
        error={previewUrlError}
        errorText="Preview endpoint URL should start with 'https://' and end with '/api/content/v1/preview/graphql/'!"
        label="Preview endpoint URL"
        onChange={handlePreviewUrl}
        value={previewUrl}
      />
      <Button
        icon="connection"
        mode="outlined"
        onPress={onAddConnection}
        style={{ backgroundColor: "#fff", marginTop: 10, borderRadius: 5 }}
      >
        {validating ? (
          <ActivityIndicator size="small" animating />
        ) : (
          <Text>Validate Connection</Text>
        )}
      </Button>
      <Toast
        message="Could not validate connection!"
        onDismiss={onToastDismiss}
        visible={showToast}
        type="warning"
      />
    </>
  );
};
