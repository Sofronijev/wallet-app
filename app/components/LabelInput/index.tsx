import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from "react-native";
import React from "react";
import colors from "constants/colors";

type LabelInputType = TextInputProps & {
  icon?: React.ReactElement;
  style?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};

const LabelInput: React.FC<LabelInputType> = ({ icon, style, inputStyle, disabled, ...props }) => {
  return (
    <View style={[styles.container, style]} pointerEvents={disabled ? 'none' : 'auto'}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <TextInput style={[styles.input, inputStyle]} editable={!disabled}  {...props} />
    </View>
  );
};

export default LabelInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  icon: {
    paddingLeft: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    fontSize: 15,
  },
});
