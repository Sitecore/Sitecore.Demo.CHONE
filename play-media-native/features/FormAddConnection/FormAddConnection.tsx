import { useCallback, useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { validateConnection } from "../../api/queries/validateConnection";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Toast } from "../../components/Toast/Toast";
import { storeConnection } from "../../helpers/connections";
import { View } from "react-native";
import { useConnections } from "../../hooks/useConnections/useConnections";
import debounce from "lodash.debounce";
import { Connection } from "../../interfaces/connections";
import { theme } from "../../theme/theme";

const defaultTextInputStyle = {
  width: "90%",
  marginVertical: theme.spacing.xxs,
};

// Connection name: allow only letters, numbers and hyphens.
//
const isNameValid = (text: string) => /^[a-z0-9-]+$/i.test(text);

const isApiKeyValid = (text: string) => !!text;

// Preview URL validation
//
const isPreviewUrlValid = (text: string) => {
  const startsCorrectly = text.startsWith("https://");
  const endsCorrectly = text.endsWith("/api/content/v1/preview/graphql/");

  return startsCorrectly && endsCorrectly;
};

export const FormAddConnection = () => {
  const { connections, add } = useConnections();
  const [validating, setValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameExistsError, setNameExistsError] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewUrlError, setPreviewUrlError] = useState(false);

  const nameInvalid = !name || nameError || nameExistsError;
  const apiKeyInvalid = !apiKey || apiKeyError;
  const previewUrlInvalid = !previewUrl || previewUrlError;
  const buttonDisabled = nameInvalid || apiKeyInvalid || previewUrlInvalid;

  const onAddConnection = useCallback(async () => {
    setValidating(true);

    await validateConnection({ apiKey, previewUrl })
      .then(async () => {
        await storeConnection({ name, apiKey, previewUrl }).then(() => {
          setShowSuccessToast(true);
          add({ name, apiKey, previewUrl });
        });
      })
      .catch(() => {
        setShowErrorToast(true);
      })
      .finally(() => {
        setValidating(false);
      });
  }, [name, apiKey, previewUrl]);

  const checkNameExists = useCallback(
    debounce((connectionName: string, existingConnections: Connection[]) => {
      const nameAlreadyExists = !!existingConnections.find(
        (connection) => connection.name === connectionName
      );
      setNameExistsError(nameAlreadyExists);
    }, 500),
    []
  );

  const handleName = useCallback(
    (text: string) => {
      setName(text);
      setNameError(!isNameValid(text));
      checkNameExists(text, connections);
    },
    [connections, checkNameExists]
  );

  const handleApiKey = useCallback((text: string) => {
    setApiKeyError(!isApiKeyValid(text));
    setApiKey(text);
  }, []);

  const handlePreviewUrl = useCallback((text: string) => {
    setPreviewUrlError(!isPreviewUrlValid(text));
    setPreviewUrl(text);
  }, []);

  const onSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
  }, []);

  const onErrorToastDismiss = useCallback(() => {
    setShowErrorToast(false);
  }, []);

  const nameErrorText = nameExistsError
    ? "Name already taken!"
    : "Name should contain only letters, numbers and hyphens!";

  return (
    <>
      <InputText
        containerStyle={defaultTextInputStyle}
        error={nameError || nameExistsError}
        errorText={nameErrorText}
        label="Connection name"
        onChange={handleName}
        value={name}
      />
      <InputText
        containerStyle={defaultTextInputStyle}
        error={apiKeyError}
        errorText="API key should not be empty!"
        label="API Key"
        onChange={handleApiKey}
        value={apiKey}
      />
      <InputText
        containerStyle={defaultTextInputStyle}
        error={previewUrlError}
        errorText="Preview endpoint URL should start with 'https://' and end with '/api/content/v1/preview/graphql/' !"
        label="Preview endpoint URL"
        onChange={handlePreviewUrl}
        value={previewUrl}
      />
      {validating && (
        <View>
          <ActivityIndicator size="small" animating />
        </View>
      )}
      <Button
        disabled={buttonDisabled}
        icon="plus-circle-outline"
        mode="contained"
        onPress={onAddConnection}
        style={{ marginTop: theme.spacing.xs }}
      >
        Add Connection
      </Button>
      <Toast
        message="Connection is valid!"
        onDismiss={onSuccessToastDismiss}
        visible={showSuccessToast}
        type="success"
      />
      <Toast
        message="Could not validate connection!"
        onDismiss={onErrorToastDismiss}
        visible={showErrorToast}
        type="warning"
      />
    </>
  );
};
