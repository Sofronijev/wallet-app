import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import React from "react";

type LabelType = TextProps & {
  style?: StyleProp<TextStyle>;
};

const Label: React.FC<LabelType> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={style}>
      {children}
    </Text>
  );
};

export default Label;
