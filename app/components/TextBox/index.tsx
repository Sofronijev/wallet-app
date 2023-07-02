import { TextInputProps, View, ViewStyle } from "react-native";
import React from "react";
import LabelInput from "components/LabelInput";

type TextBoxProps = TextInputProps & { style?: ViewStyle };

const TextBox: React.FC<TextBoxProps> = ({ style, ...props }) => {
  return (
    <View style={style}>
      <LabelInput {...props} multiline textAlignVertical='top' />
    </View>
  );
};

export default TextBox;

