import { useCallback, useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { validateConnection } from "../../api/queries/validateConnection";
import { ActivityIndicator, Button } from "react-native-paper";
import { Toast } from "../../components/Toast/Toast";
import { storeConnection } from "../../helpers/connections";
import { View } from "react-native";
import { useConnections } from "../../hooks/useConnections/useConnections";
import debounce from "lodash.debounce";
import { Connection } from "../../interfaces/connections";
import { theme } from "../../theme/theme";
import { styles } from "../../theme/styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "../../interfaces/navigators";

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
  const [clientID, setClientID] = useState("");
  const [clientIDError, setClientIDError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [clientSecretError, setClientSecretError] = useState(false);

  const nameInvalid = !name || nameError || nameExistsError;
  const apiKeyInvalid = !apiKey || apiKeyError;
  const previewUrlInvalid = !previewUrl || previewUrlError;
  const clientIDInvalid = !clientID || clientIDError;
  const clientSecretInvalid = !clientSecret || clientSecretError;
  const buttonDisabled =
    nameInvalid ||
    apiKeyInvalid ||
    previewUrlInvalid ||
    clientIDInvalid ||
    clientSecretInvalid;

  const navigation = useNavigation<StackNavigationProp>();

  const onAddConnection = useCallback(async () => {
    setValidating(true);

    await validateConnection({ apiKey, previewUrl, clientID, clientSecret })
      .then(async () => {
        await storeConnection({
          name,
          apiKey,
          previewUrl,
          clientID,
          clientSecret,
        }).then(() => {
          setShowSuccessToast(true);
          add({ name, apiKey, previewUrl, clientID, clientSecret });
        });
      })
      .catch((e) => {
        console.error(e);
        setShowErrorToast(true);
      })
      .finally(() => {
        setValidating(false);
      });
  }, [name, apiKey, previewUrl, clientID, clientSecret]);

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

  const handleClientID = useCallback((text: string) => {
    setClientIDError(!text);
    setClientID(text);
  }, []);

  const handleClientSecret = useCallback((text: string) => {
    setClientSecretError(!text);
    setClientSecret(text);
  }, []);

  const onSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
    navigation.goBack();
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
      <InputText
        containerStyle={defaultTextInputStyle}
        error={clientIDError}
        errorText="Client ID should not be empty!"
        label="Client ID"
        onChange={handleClientID}
        value={clientID}
      />
      <InputText
        containerStyle={defaultTextInputStyle}
        error={clientSecretError}
        errorText="Client secret should not be empty!"
        label="Client secret"
        onChange={handleClientSecret}
        value={clientSecret}
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
        labelStyle={styles.buttonLabel}
        style={{ marginTop: theme.spacing.xs, ...styles.button }}
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
