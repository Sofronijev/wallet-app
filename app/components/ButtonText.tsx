import { TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import Label from "./Label";
import { buttonColor, ButtonType } from "modules/buttons";

type ButtonTextProps = {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  type?: ButtonType;
};

const ButtonText: React.FC<ButtonTextProps> = ({ onPress, title, style, type = "primary" }) => {
  const color = buttonColor[type];
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Label style={{ color }}>{title}</Label>
    </TouchableOpacity>
  );
};

export default ButtonText;

