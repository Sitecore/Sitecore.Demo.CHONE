import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import { Sport } from '../../interfaces/sport';
import { theme } from '../../theme/theme';

const styles = StyleSheet.create({
  topLabel: {
    marginBottom: theme.spacing.xs,
  },
  radioButton: {
    marginBottom: theme.spacing.xs,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  label: {
    position: 'absolute',
    left: theme.spacing.lg,
    paddingLeft: theme.spacing.xs,
    color: theme.colors.black.DEFAULT,
  },
});

type SportPickerProps = {
  initialValue?: string;
  onChange: (value: string) => void;
  sports: Sport[];
};

export const SportPicker = ({ onChange, sports, initialValue = '' }: SportPickerProps) => {
  const [value, setValue] = useState<string>();

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);

      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <>
      <Text style={styles.topLabel}>Sport</Text>
      <RadioButton.Group onValueChange={handleChange} value={value || initialValue}>
        {sports?.map((sport) => (
          <RadioButton.Item
            key={sport.title}
            position="leading"
            style={[
              styles.radioButton,
              {
                backgroundColor:
                  value === sport.title || (!value && initialValue === sport.title)
                    ? theme.colors.yellow.DEFAULT
                    : theme.colors.white.DEFAULT,
              },
            ]}
            labelStyle={styles.label}
            label={sport.title}
            value={sport.title}
            uncheckedColor={theme.colors.gray.DEFAULT}
            color={theme.colors.black.DEFAULT}
          />
        ))}
      </RadioButton.Group>
    </>
  );
};
