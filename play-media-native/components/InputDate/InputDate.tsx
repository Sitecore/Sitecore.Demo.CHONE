import { useCallback, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { DatePicker } from '../../components/DatePicker/DatePicker';
import { InputText } from '../../components/InputText/InputText';
import { getDate } from '../../helpers/dateHelper';
import { styles } from '../../theme/styles';

export const InputDate = ({
  onChange,
  required,
  style,
  title,
  value,
}: {
  onChange: (date: Date) => void;
  required: boolean;
  style?: ViewStyle;
  title?: string;
  value: Date;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <View style={style}>
      <Pressable onPress={open}>
        <View pointerEvents="none">
          <InputText
            caretHidden
            containerStyle={styles.inputContainer}
            required={required}
            showSoftInputOnFocus={false}
            title={title}
            value={value ? getDate(value) : ''}
          />
        </View>
      </Pressable>
      {isVisible && <DatePicker value={value} visible onChange={onChange} onClose={close} />}
    </View>
  );
};
