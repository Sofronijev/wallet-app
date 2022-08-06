import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Label from "./Label";
import colors from "constants/colors";
import { getFormattedDate } from "modules/timeAndDate";

const mode = "date";

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
  const isIosDevice = Platform.OS === "ios";

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ?? new Date();
    if (typeof onDateSelect === "function") onDateSelect(currentDate);
  };

  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value,
      onChange,
      mode,
      maximumDate,
      minimumDate,
    });
  };

  return (
    <View style={styles.flexRow}>
      {!isIosDevice && (
        <TouchableWithoutFeedback onPress={openDatePicker}>
          <View style={styles.input}>
            <AntDesign name='calendar' size={25} color='black' style={styles.icon} />
            <Label style={styles.label}>{getFormattedDate(value)}</Label>
          </View>
        </TouchableWithoutFeedback>
      )}
      {/* TODO - Fix calendar for IOS */}
      {isIosDevice && (
        <View style={styles.input}>
          <AntDesign name='calendar' size={25} color='black' style={styles.icon} />
          <DateTimePicker
            value={value}
            mode={mode}
            onChange={onChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            style={styles.calendar}
          />
        </View>
      )}
    </View>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iosContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  calendar: {
    flex: 1,
    width: 100,
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    fontSize: 15,
  },
  icon: {
    paddingLeft: 10,
  },
});
