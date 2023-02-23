import { useState } from 'react';
import { View } from 'react-native';

import { InputText } from '../../components/InputText/InputText';
import { RichTextEditor } from '../../components/RichTextEditor/RichTextEditor';
import { KeyboardAwareScreen } from '../../features/Screen/KeyboardAwareScreen';
import { theme } from '../../theme/theme';

const inputContainerStyle = {
  marginBottom: theme.spacing.sm,
};

export const RichTextView = ({ setBody, setTeaser, teaser }) => {
  const [rteJson, setRteJson] = useState();
  const [showError, setShowError] = useState(false);

  const handleChange = (jsonData) => {
    setShowError(!jsonData);
    setRteJson(jsonData);
    setBody(jsonData);
  };

  return (
    <KeyboardAwareScreen>
      <View
        style={{
          paddingHorizontal: theme.spacing.sm,
          marginTop: theme.spacing.sm,
        }}
      >
        <InputText
          onChange={setTeaser}
          containerStyle={inputContainerStyle}
          value={teaser}
          title="Teaser"
        />
        <RichTextEditor
          showError={showError}
          errorText="Please enter a description."
          onChange={handleChange}
        />
      </View>
    </KeyboardAwareScreen>
  );
};
