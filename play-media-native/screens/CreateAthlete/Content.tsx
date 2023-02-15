import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { DatePicker } from '../../components/DatePicker/DatePicker';
import { InputText } from '../../components/InputText/InputText';
import { getYear } from '../../helpers/dateHelper';
import { theme } from '../../theme/theme';

export const Content = () => {
  const [quote, handleChangeQuote] = useState('');
  const [careerStartDate, handleChangeCareerStartDate] = useState(new Date());
  const [hobby, handleChangeHobby] = useState('');

  const [showCareerStartDatePicker, setShowCareerStartDatePicker] = useState(false);

  return (
    <View style={{ marginTop: theme.spacing.lg }}>
      <InputText onChange={handleChangeQuote} value={quote} title="Quote" />
      <Pressable onPress={() => setShowCareerStartDatePicker(true)}>
        <View pointerEvents="none">
          <InputText
            value={getYear(careerStartDate)}
            title="Career start"
            showSoftInputOnFocus={false}
            caretHidden
          />
        </View>
      </Pressable>
      {showCareerStartDatePicker && (
        <DatePicker
          value={careerStartDate}
          visible={showCareerStartDatePicker}
          onChange={handleChangeCareerStartDate}
          onClose={setShowCareerStartDatePicker}
        />
      )}
      <InputText onChange={handleChangeHobby} value={hobby} title="Hobby" />
    </View>
  );
};
