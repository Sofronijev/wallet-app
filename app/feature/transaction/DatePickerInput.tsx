import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import Label from "components/Label";
import { getFormattedDate } from "modules/timeAndDate";
import colors from "constants/colors";


const isIosDevice = Platform.OS === "ios";

type DatePickerInputProps = {
  date: Date;
  maximumDate?: Date;
  minimumDate?: Date;
  onDateSelect?: (selectedDate: Date) => void;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  date,
  maximumDate,
  minimumDate,
  onDateSelect,
}) => {
  const value = date || new Date();
  const [show, setShow] = useState(isIosDevice);

  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate ?? new Date();
    setShow(isIosDevice);
    if (typeof onDateSelect === "function") onDateSelect(currentDate);
  };
  const showCalendar = () => {
    setShow(true);
  };

  return (
    <View>
      <View style={styles.container}>
        <Label style={styles.label}>Date</Label>
        {!isIosDevice && (
          <TouchableOpacity onPress={showCalendar}>
            <Label style={styles.dateLabel}>{getFormattedDate(value)}</Label>
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
            style={[isIosDevice && styles.calendar]}
          />
        )}
      </View>
    </View>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
  },
  dateLabel: {
    fontSize: 16,
    color: colors.hyperlink,
  },
  calendar: {
    flex: 1,
  },
});
