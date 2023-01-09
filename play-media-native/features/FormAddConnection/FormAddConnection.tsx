import { useCallback, useState } from "react";
import { InputText } from "../../components/InputText/InputText";
import { validateConnection } from "../../api/queries/validateConnection";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Toast } from "../../components/Toast/Toast";
import { storeConnection } from "../../helpers/connections";
import { deleteValueFor } from "../../helpers/secureStorage";
import { View } from "react-native";

const defaultTextInputStyle = {
  width: "90%",
  marginVertical: 5,
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

interface Props {
  onSuccess?: () => void;
}

export const FormAddConnection = ({ onSuccess }: Props) => {
  const [validating, setValidating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewUrlError, setPreviewUrlError] = useState(false);

  const nameInvalid = !name || nameError;
  const apiKeyInvalid = !apiKey || apiKeyError;
  const previewUrlInvalid = !previewUrl || previewUrlError;
  const buttonDisabled = nameInvalid || apiKeyInvalid || previewUrlInvalid;

  const onAddConnection = useCallback(async () => {
    setValidating(true);

    await validateConnection({ apiKey, previewUrl })
      .then(async () => {
        await storeConnection({ name, apiKey, previewUrl }).then(() => {
          setShowSuccessToast(true);

          if (onSuccess) {
            onSuccess();
          }
        });
      })
      .catch(() => {
        setShowErrorToast(true);
      })
      .finally(() => {
        setValidating(false);
      });
  }, [name, apiKey, previewUrl, onSuccess]);

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

  const onSuccessToastDismiss = useCallback(() => {
    setShowSuccessToast(false);
  }, []);

  const onErrorToastDismiss = useCallback(() => {
    setShowErrorToast(false);
  }, []);

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
        errorText="Preview endpoint URL should start with 'https://' and end with '/api/content/v1/preview/graphql/' !"
        label="Preview endpoint URL"
        onChange={handlePreviewUrl}
        value={previewUrl}
      />
      <Button
        disabled={buttonDisabled}
        icon="plus-circle-outline"
        mode="outlined"
        onPress={onAddConnection}
        style={{ marginTop: 10, borderRadius: 5 }}
      >
        {validating ? (
          <View>
            <ActivityIndicator size="small" animating />
          </View>
        ) : (
          <Text>Add Connection</Text>
        )}
      </Button>
      <Button
        icon="plus-circle-outline"
        mode="outlined"
        onPress={async () => {
          await deleteValueFor("connections");
        }}
        style={{ marginTop: 10, borderRadius: 5 }}
      >
        <Text>Delete Connections (temp)</Text>
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
