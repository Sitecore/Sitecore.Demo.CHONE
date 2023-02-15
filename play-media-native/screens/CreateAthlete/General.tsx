import { useState } from 'react';
import { View } from 'react-native';

import { DatePicker } from '../../components/DatePicker/DatePicker';
import { InputText } from '../../components/InputText/InputText';
import { SportPicker } from '../../features/SportPicker/SportPicker';
import { getDate } from '../../helpers/dateHelper';
import { Sport } from '../../interfaces/sport';
import { theme } from '../../theme/theme';

type GeneralProps = {
  sports: Sport[];
};

export const General = ({ sports }: GeneralProps) => {
  const [name, handleChangeName] = useState('');
  const [nationality, handleChangeNationality] = useState('');
  const [birthDate, handleChangeBirthDate] = useState(new Date());
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);

  return (
    <View style={{ marginTop: theme.spacing.lg }}>
      <InputText onChange={handleChangeName} value={name} title="Athlete name" />
      <InputText onChange={handleChangeNationality} value={nationality} title="Nationality" />
      <InputText
        value={getDate(birthDate)}
        title="Birth date"
        showSoftInputOnFocus={false}
        caretHidden
        onTouchStart={() => setShowBirthDatePicker(true)}
      />
      {showBirthDatePicker && (
        <DatePicker
          value={birthDate}
          visible={showBirthDatePicker}
          onChange={handleChangeBirthDate}
          onClose={setShowBirthDatePicker}
        />
      )}
      <SportPicker sports={sports} />
    </View>
  );
};
