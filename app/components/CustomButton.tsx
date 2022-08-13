import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import colors from "constants/colors";

type CustomButtonType = {
  onPress?: () => void;
  title: string;
  style?: ViewStyle;
};

const CustomButton: React.FC<CustomButtonType> = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenMint,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 15,
    textTransform: "uppercase",
  },
});
