import { useState } from "react";
import { View, TextInput } from "react-native";
import { Text } from "react-native-paper";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { getYear } from "../../helpers/dateHelper";
import { theme } from "../../theme/theme";
import { athleteStyles } from "./styles";

export const Content = () => {
  const [quote, handleChangeQuote] = useState("");
  const [careerStartDate, handleChangeCareerStartDate] = useState(new Date());
  const [hobby, handleChangeHobby] = useState("");

  const [showCareerStartDatePicker, setShowCareerStartDatePicker] =
    useState(false);

  return (
    <View style={{ marginTop: theme.spacing.lg }}>
      <Text style={athleteStyles.label}>Quote</Text>
      <TextInput
        style={athleteStyles.textInput}
        onChangeText={handleChangeQuote}
        value={quote}
      />
      <Text style={athleteStyles.label}>Career start</Text>
      <TextInput
        style={athleteStyles.textInput}
        onTouchStart={() => setShowCareerStartDatePicker(true)}
        value={getYear(careerStartDate)}
        showSoftInputOnFocus={false}
        caretHidden={true}
      />
      {showCareerStartDatePicker && (
        <DatePicker
          value={careerStartDate}
          visible={showCareerStartDatePicker}
          onChange={handleChangeCareerStartDate}
          onClose={setShowCareerStartDatePicker}
        />
      )}
      <Text style={athleteStyles.label}>Hobby</Text>
      <TextInput
        style={athleteStyles.textInput}
        onChangeText={handleChangeHobby}
        value={hobby}
      />
    </View>
  );
};
