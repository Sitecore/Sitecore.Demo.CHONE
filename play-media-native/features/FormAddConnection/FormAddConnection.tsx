import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { validateConnection } from '../../api/queries/validateConnection';
import { BottomActions } from '../../components/BottomActions/BottomActions';
import { MaterialIcon } from '../../components/Icon/MaterialIcon';
import { InputText } from '../../components/InputText/InputText';
import {
  ADD_CONNECTION_SUCCESS_MESSAGE_TIMEOUT,
  ERROR_CONNECTIONS_API_KEY,
  ERROR_CONNECTIONS_CLIENT_CREDENTIALS,
} from '../../constants/connections';
import {
  editConnection,
  getConnections,
  getSelectedConnection,
  setSelectedConnection,
  storeConnection,
} from '../../helpers/connections';
import { Connection } from '../../interfaces/connections';
import { StackNavigationProp } from '../../interfaces/navigators';
import connectionStyles from '../../screens/Connection/styles';
import { styles } from '../../theme/styles';
import { theme } from '../../theme/theme';

const defaultTextInputStyle = {
  marginBottom: theme.spacing.xs,
  flexGrow: 1,
};

// Connection name: allow only letters, numbers and hyphens.
//
const isNameValid = (text: string) => /^[a-z0-9-]+$/i.test(text);

const isApiKeyValid = (text: string) => !!text;

// Preview URL validation
//
const isPreviewUrlValid = (text: string) => {
  const startsCorrectly = text.startsWith('https://');
  const endsCorrectly = text.endsWith('/api/content/v1/preview/graphql/');

  return startsCorrectly && endsCorrectly;
};

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.red.DEFAULT,
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.xs,
        marginBottom: theme.spacing.md,
        width: '100%',
      }}
    >
      <MaterialIcon
        name="exclamation"
        color={theme.colors.red.DEFAULT}
        size={20}
        style={{
          backgroundColor: theme.colors.white.DEFAULT,
          borderRadius: 20,
          marginRight: theme.spacing.xs,
        }}
      />
      <Text style={{ flexShrink: 1 }}>{message}</Text>
    </View>
  );
};

export const FormAddConnection = ({ initialValue }: { initialValue?: Connection }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [name, setName] = useState(initialValue?.name || '');
  const [nameError, setNameError] = useState(false);
  const [nameExistsError, setNameExistsError] = useState(false);
  const [apiKey, setApiKey] = useState(initialValue?.apiKey || '');
  const [apiKeyError, setApiKeyError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialValue?.previewUrl || '');
  const [previewUrlError, setPreviewUrlError] = useState(false);
  const [clientID, setClientID] = useState(initialValue?.clientID || '');
  const [clientIDError, setClientIDError] = useState(false);
  const [clientSecret, setClientSecret] = useState(initialValue?.clientSecret || '');
  const [clientSecretError, setClientSecretError] = useState(false);
  const [clientCredentialsError, setClientCredentialsError] = useState(false);
  const [schemaError, setSchemaError] = useState(false);
  const [showSuccessView, setShowSuccessView] = useState(false);

  const nameInvalid = !name || nameError || nameExistsError;
  const apiKeyInvalid = !apiKey || apiKeyError;
  const previewUrlInvalid = !previewUrl || previewUrlError;
  const clientIDInvalid = !clientID || clientIDError;
  const clientSecretInvalid = !clientSecret || clientSecretError;
  const isButtonDisabled =
    nameInvalid || apiKeyInvalid || previewUrlInvalid || clientIDInvalid || clientSecretInvalid;

  const navigation = useNavigation<StackNavigationProp>();

  const title = useMemo(() => {
    return (
      <Text variant="labelMedium" style={connectionStyles.title}>
        {initialValue ? `Edit a connection to a${' '}` : `Add connection details to a${' '}`}
        <Text variant="labelMedium" style={connectionStyles.chOneText}>
          Content Hub ONE{' '}
        </Text>
        instance.
      </Text>
    );
  }, [initialValue]);

  // Retrieve the saved connections from Expo Secure Store
  useEffect(() => {
    (async () => {
      const savedConnections = await getConnections();
      setConnections(savedConnections);
    })();
  }, []);

  // Update the header title on connection name edit
  useEffect(() => {
    navigation.setParams({
      title: name || 'Untitled connection',
    });
  }, [name, navigation]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkNameExists = useCallback(
    debounce((connectionName: string, existingConnections: Connection[]) => {
      if (connectionName === initialValue?.name) {
        return;
      }

      const nameAlreadyExists = !!existingConnections.find(
        (connection) => connection.name === connectionName
      );

      setNameExistsError(nameAlreadyExists);
    }, 500),
    []
  );

  const handleName = useCallback(
    (text: string) => {
      const trimmed = text.trim();

      setName(trimmed);
      setNameError(!isNameValid(trimmed));
      checkNameExists(trimmed, connections);
    },
    [connections, checkNameExists]
  );

  const handleApiKey = useCallback(
    (text: string) => {
      if (schemaError) {
        setSchemaError(false);
      }

      const trimmed = text.trim();

      setApiKeyError(!isApiKeyValid(trimmed));
      setApiKey(trimmed);
    },
    [schemaError]
  );

  const handlePreviewUrl = useCallback(
    (text: string) => {
      if (schemaError) {
        setSchemaError(false);
      }

      const trimmed = text.trim();

      setPreviewUrlError(!isPreviewUrlValid(trimmed));
      setPreviewUrl(trimmed);
    },
    [schemaError]
  );

  const handleClientID = useCallback(
    (text: string) => {
      if (clientCredentialsError) {
        setClientCredentialsError(false);
      }

      const trimmed = text.trim();

      setClientIDError(!trimmed);
      setClientID(trimmed);
    },
    [clientCredentialsError]
  );

  const handleClientSecret = useCallback(
    (text: string) => {
      if (clientCredentialsError) {
        setClientCredentialsError(false);
      }

      const trimmed = text.trim();

      setClientSecretError(!trimmed);
      setClientSecret(trimmed);
    },
    [clientCredentialsError]
  );

  const handleDiscardBtn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleConnectBtn = useCallback(async () => {
    setClientCredentialsError(false);
    setSchemaError(false);
    setIsValidating(true);

    await validateConnection({ apiKey, previewUrl, clientID, clientSecret })
      .then(async ([credentialsResponse, schemaResponse]: any) => {
        const hasErrorCredentials = credentialsResponse === ERROR_CONNECTIONS_CLIENT_CREDENTIALS;
        const hasErrorSchema = schemaResponse === ERROR_CONNECTIONS_API_KEY;

        if (hasErrorCredentials || hasErrorSchema) {
          setClientCredentialsError(hasErrorCredentials);
          setSchemaError(hasErrorSchema);
          return;
        }

        if (initialValue) {
          await editConnection(initialValue.name, {
            name,
            apiKey,
            previewUrl,
            clientID,
            clientSecret,
          }).then(async () => {
            const selectedConnection = await getSelectedConnection();
            if (selectedConnection?.name === initialValue?.name) {
              await setSelectedConnection({ name, apiKey, previewUrl, clientID, clientSecret });
            }

            navigation.navigate('SelectConnection');
          });
        } else {
          await storeConnection({
            name,
            apiKey,
            previewUrl,
            clientID,
            clientSecret,
          }).then(() => {
            setShowSuccessView(true);

            setTimeout(() => {
              navigation.navigate('MainTabs');
            }, ADD_CONNECTION_SUCCESS_MESSAGE_TIMEOUT);
          });
        }
      })
      .finally(() => {
        setIsValidating(false);
      });
  }, [apiKey, previewUrl, clientID, clientSecret, name, initialValue, navigation]);

  const bottomActions = useMemo(
    () => (
      <BottomActions style={connectionStyles.actionBtns}>
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleDiscardBtn}
        >
          Discard
        </Button>
        <Button
          mode="contained"
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          labelStyle={styles.buttonLabel}
          onPress={handleConnectBtn}
          disabled={isButtonDisabled}
        >
          {initialValue ? 'Save' : 'Connect'}
        </Button>
      </BottomActions>
    ),
    [handleDiscardBtn, handleConnectBtn, isButtonDisabled, initialValue]
  );

  const successView = useMemo(() => {
    const successMessage = (
      <>
        <Text>Connection</Text>
        <Text style={connectionStyles.chOneText}> {name}</Text>
        <Text> was successfully added!</Text>
      </>
    );

    return <Text>{successMessage}</Text>;
  }, [name]);

  const nameErrorText = nameExistsError
    ? 'Connection name already exists!'
    : 'Name should contain only letters, numbers and hyphens!';

  return (
    <>
      {showSuccessView ? (
        successView
      ) : isValidating ? (
        <>
          <Text style={{ marginBottom: theme.spacing.xs }}>Validating Connection...</Text>
          <View>
            <ActivityIndicator size="small" animating />
          </View>
        </>
      ) : (
        <>
          <ScrollView
            style={{
              marginTop: theme.spacing.md,
              paddingHorizontal: theme.spacing.sm,
              width: '100%',
            }}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={connectionStyles.container}>{title}</View>
            <InputText
              containerStyle={defaultTextInputStyle}
              inputStyle={{ marginBottom: nameError || nameExistsError ? 0 : theme.spacing.sm }}
              onChange={handleName}
              title="Connection name"
              value={name}
            />
            {(nameError || nameExistsError) && <ErrorMessage message={nameErrorText} />}
            <InputText
              containerStyle={defaultTextInputStyle}
              error={clientIDError}
              errorText="Client ID should not be empty!"
              onChange={handleClientID}
              title="Client ID"
              value={clientID}
            />
            <InputText
              containerStyle={defaultTextInputStyle}
              error={clientSecretError}
              errorText="Client secret should not be empty!"
              inputStyle={{ marginBottom: clientCredentialsError ? 0 : theme.spacing.sm }}
              onChange={handleClientSecret}
              title="Client secret"
              value={clientSecret}
            />
            {clientCredentialsError && <ErrorMessage message="Invalid Client ID/secret!" />}
            <InputText
              containerStyle={defaultTextInputStyle}
              onChange={handleApiKey}
              title="API Key"
              value={apiKey}
            />
            <InputText
              containerStyle={defaultTextInputStyle}
              onChange={handlePreviewUrl}
              title="Preview endpoint URL"
              value={previewUrl}
            />
            {previewUrlError && (
              <ErrorMessage message="Preview endpoint URL should start with 'https://' and end with '/api/content/v1/preview/graphql/' !" />
            )}
            {schemaError && <ErrorMessage message="Invalid API key or Preview endpoint URL!" />}
            <View style={{ height: 60 }} />
          </ScrollView>
          {bottomActions}
        </>
      )}
    </>
  );
};
