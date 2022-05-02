import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import Label from "./Label";
import colors from "constants/colors";

type ButtonTextProps = {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
};

const ButtonText: React.FC<ButtonTextProps> = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Label style={styles.title}>{title}</Label>
    </TouchableOpacity>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  title: {
    color: colors.greenMint,
  },
});
