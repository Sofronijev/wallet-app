import React, { useState } from "react";
import { Platform, StyleSheet, TextStyle, TouchableOpacity, View } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { formatIsoDate, getFormattedDate } from "modules/timeAndDate";
import colors from "constants/colors";
import LabelInput from "components/LabelInput";
import { FontAwesome } from "@expo/vector-icons";

const isIosDevice = Platform.OS === "ios";

type DatePickerInputProps = {
  date: Date;
  maximumDate?: Date;
  minimumDate?: Date;
  onDateSelect?: (selectedDate: string) => void;
  style?: TextStyle;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  date,
  maximumDate,
  minimumDate,
  onDateSelect,
  style,
}) => {
  const value = date || new Date();
  const [show, setShow] = useState(isIosDevice);

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate ?? new Date();
    setShow(isIosDevice);
    if (typeof onDateSelect === "function") onDateSelect(formatIsoDate(currentDate));
  };
  const showCalendar = () => {
    setShow(true);
  };
  // BUG - IOS BUG - Calendar for IOS doesn't look good
  return (
    <View>
      {!isIosDevice && (
        <TouchableOpacity onPress={showCalendar}>
          <LabelInput
            value={getFormattedDate(value)}
            icon={<FontAwesome name='calendar' size={24} color={colors.greenMint} />}
            editable={false}
            inputStyle={styles.dateLabel}
          />
        </TouchableOpacity>
      )}
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={value}
          mode='date'
          is24Hour={true}
          onChange={onChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  dateLabel: {
    color: colors.black,
  },
});
