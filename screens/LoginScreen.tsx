import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Label from "../components/Label";
import LabelInput from "../components/LabelInput";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

type Props = {};

const LoginScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Label style={styles.text}>Welcome</Label>
      <LabelInput
        style={styles.input}
        icon={<FontAwesome name='user-o' size={24} color='grey' />}
      />
      <LabelInput icon={<Ionicons name='ios-key-outline' size={24} color='grey' />} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
    letterSpacing: 1,
  },
  input: {
    marginBottom: 10,
  },
});
