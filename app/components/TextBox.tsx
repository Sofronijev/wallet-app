import { StyleSheet, Text, TextInputProps, View, ViewStyle } from "react-native";
import React from "react";
import LabelInput from "./LabelInput";

type TextBoxProps = TextInputProps & { style?: ViewStyle };

const TextBox: React.FC<TextBoxProps> = ({ style, ...props }) => {
  return (
    <View style={style}>
      <LabelInput {...props} multiline textAlignVertical='top' />
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});
