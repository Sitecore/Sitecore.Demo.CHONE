import { useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { inputContainerStyle } from './styles';
import { DatePicker } from '../../components/DatePicker/DatePicker';
import { InputText } from '../../components/InputText/InputText';
import { SportPicker } from '../../features/SportPicker/SportPicker';
import { getDate } from '../../helpers/dateHelper';

export const FieldsView = ({
  date,
  handleSportChange,
  location,
  setDate,
  setTitle,
  setLocation,
  setShowDatePicker,
  showDatePicker,
  sport,
  sports,
  title,
}) => {
  const openDatePicker = useCallback(() => {
    setShowDatePicker(true);
  }, [setShowDatePicker]);

  return (
    <>
      <InputText
        containerStyle={inputContainerStyle}
        onChange={setTitle}
        value={title}
        title="Title"
      />
      <Pressable onPress={openDatePicker}>
        <View pointerEvents="none">
          <InputText
            containerStyle={inputContainerStyle}
            value={getDate(date)}
            title="Event Date"
            showSoftInputOnFocus={false}
            caretHidden
          />
        </View>
      </Pressable>
      {showDatePicker && (
        <DatePicker
          value={date}
          visible={showDatePicker}
          onChange={setDate}
          onClose={setShowDatePicker}
        />
      )}
      <InputText
        containerStyle={inputContainerStyle}
        onChange={setLocation}
        value={location}
        title="Location"
      />
      <SportPicker
        onChange={handleSportChange}
        sports={sports}
        initialValue={sport?.title || sports[0]?.title}
      />
    </>
  );
};
