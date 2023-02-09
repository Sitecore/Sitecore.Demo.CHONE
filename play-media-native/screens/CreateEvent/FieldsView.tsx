import { View } from "react-native";
import { InputText } from "../../components/InputText/InputText";
import { theme } from "../../theme/theme";
import { inputContainerStyle } from "./styles";
import { SportPicker } from "../../features/SportPicker/SportPicker";
import { getDate } from "../../helpers/dateHelper";
import { DatePicker } from "../../components/DatePicker/DatePicker";

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
  return (
    <>
      <InputText
        containerStyle={inputContainerStyle}
        onChange={setTitle}
        value={title}
        title={"Title"}
      />
      <InputText
        containerStyle={inputContainerStyle}
        value={getDate(date)}
        title={"Event Date"}
        showSoftInputOnFocus={false}
        caretHidden={true}
        onTouchStart={() => setShowDatePicker(true)}
      />
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
        title={"Location"}
      />
      <SportPicker
        onChange={handleSportChange}
        sports={sports}
        initialValue={sport?.title || sports[0]?.title}
      />
    </>
  );
};
