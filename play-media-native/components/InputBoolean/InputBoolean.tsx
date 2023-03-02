import { View, ViewStyle } from 'react-native';
import { Switch } from 'react-native-paper';

import { theme } from '../../theme/theme';
import { FieldLabel } from '../FieldLabel/FieldLabel';

export const InputBoolean = ({
  containerStyle,
  initialValue,
  onChange,
  required,
  title,
  value,
}: {
  containerStyle?: ViewStyle;
  initialValue?: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  title?: string;
  value: boolean;
}) => {
  const inputValue = value || initialValue;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <FieldLabel required={required} title={title} />
      <Switch
        onValueChange={onChange}
        thumbColor={theme.colors.white.DEFAULT}
        trackColor={{ false: theme.colors.gray.DEFAULT, true: theme.colors.green.DEFAULT }}
        value={inputValue}
      />
    </View>
  );
};
