import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

type LabelInputType = TextInputProps & {
  icon?: React.ReactElement;
  style?: StyleProp<TextStyle>;
};

const LabelInput: React.FC<LabelInputType> = ({ icon, style, ...props }) => {
  return (
    <View style={[style, styles.container]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <TextInput style={styles.input} {...props} />
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
    paddingVertical: 5,
    flex: 1,
  },
});
