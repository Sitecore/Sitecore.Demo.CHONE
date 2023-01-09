import { useMemo } from "react";
import { StyleProp, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { Icon } from "../Icon/Icon";

interface Props {
  containerStyle: StyleProp<any>;
  contentStyle?: StyleProp<any>;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  inputStyle?: StyleProp<any>;
  label: string;
  onChange: (text: string) => void;
  outlineStyle?: StyleProp<any>;
  underlineStyle?: StyleProp<any>;
  value: string;
}

const defaultContainerStyle = {
  width: "100%",
};

const defaultInputStyle = {
  borderRadius: 0,
};

export const InputText = ({
  containerStyle,
  contentStyle,
  disabled,
  error,
  errorText,
  inputStyle,
  label,
  onChange,
  outlineStyle,
  underlineStyle,
  value,
}: Props) => {
  const containerStyleFinal = useMemo(
    () => ({
      ...defaultContainerStyle,
      ...containerStyle,
    }),
    [inputStyle]
  );

  const inputStyleFinal = useMemo(
    () => ({
      ...defaultInputStyle,
      ...inputStyle,
    }),
    [inputStyle]
  );

  return (
    <View style={containerStyleFinal}>
      <TextInput
        contentStyle={contentStyle}
        disabled={disabled}
        label={label}
        onChangeText={onChange}
        outlineStyle={outlineStyle}
        style={inputStyleFinal}
        underlineStyle={underlineStyle}
        value={value}
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
