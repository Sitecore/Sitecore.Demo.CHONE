import { useCallback, useState } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { DatePicker } from '../../components/DatePicker/DatePicker';
import { InputText } from '../../components/InputText/InputText';
import { getDate } from '../../helpers/dateHelper';
import { styles } from '../../theme/styles';

export const InputDate = ({
  onChange,
  style,
  title,
  value,
}: {
  onChange: (date: Date) => void;
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
            containerStyle={styles.inputContainer}
            value={value ? getDate(value) : ''}
            title={title}
            showSoftInputOnFocus={false}
            caretHidden
          />
        </View>
      </Pressable>
      {isVisible && <DatePicker value={value} visible onChange={onChange} onClose={close} />}
    </View>
  );
};
