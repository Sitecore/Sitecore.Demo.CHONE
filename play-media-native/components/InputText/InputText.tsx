import { useMemo } from "react";
import { StyleProp, View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";
import { Icon } from "../Icon/Icon";
import { theme } from "../../theme/theme";

interface Props {
  containerStyle?: StyleProp<any>;
  contentStyle?: StyleProp<any>;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  inputStyle?: StyleProp<any>;
  label?: string;
  multiline?: boolean;
  onChange?: (text: string) => void;
  outlineStyle?: StyleProp<any>;
  title?: string;
  underlineStyle?: StyleProp<any>;
  value: string;
  showSoftInputOnFocus?: boolean;
  caretHidden?: boolean;
  onTouchStart?: (e: unknown) => void;
}

const defaultContainerStyle = {
  width: "100%",
};

const defaultInputStyle = {
  borderRadius: 0,
};

const defaultContentStyle = {
  fontFamily: theme.fontFamily.DEFAULT,
};

export const InputText = ({
  containerStyle,
  contentStyle,
  disabled,
  error,
  errorText,
  inputStyle,
  label,
  multiline,
  onChange,
  outlineStyle,
  title,
  underlineStyle,
  value,
  showSoftInputOnFocus,
  caretHidden,
  onTouchStart,
}: Props) => {
  const containerStyleFinal = useMemo(
    () => ({
      ...defaultContainerStyle,
      ...containerStyle,
    }),
    [containerStyle]
  );

  const inputStyleFinal = useMemo(
    () => ({
      ...defaultInputStyle,
      ...inputStyle,
    }),
    [inputStyle]
  );

  const contentStyleFinal = useMemo(
    () => ({
      ...defaultContentStyle,
      ...contentStyle,
    }),
    [contentStyle]
  );

  return (
    <View style={containerStyleFinal}>
      {title && (
        <Text style={{ color: theme.colors.gray.dark }} variant="labelLarge">
          {title}
        </Text>
      )}
      <TextInput
        contentStyle={contentStyleFinal}
        disabled={disabled}
        label={label}
        multiline={multiline}
        onChangeText={onChange}
        outlineStyle={outlineStyle}
        style={inputStyleFinal}
        underlineStyle={underlineStyle}
        value={value}
        showSoftInputOnFocus={showSoftInputOnFocus}
        caretHidden={caretHidden}
        onTouchStart={onTouchStart}
      />
      {error && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="warning-outline" color="red" size={16} />
          <HelperText type="error" visible>
            {errorText}
          </HelperText>
        </View>
      )}
    </View>
  );
};
