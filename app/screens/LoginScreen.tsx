import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Label from "../components/Label";
import LabelInput from "../components/LabelInput";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";

type Props = {};

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Label style={styles.text}>Welcome</Label>
      <LabelInput
        style={styles.input}
        icon={<FontAwesome name='user-o' size={24} color={colors.greenMint} />}
        placeholder='Email'
        keyboardType='email-address'
      />
      <LabelInput
        icon={<Ionicons name='ios-key-outline' size={24} color={colors.greenMint} />}
        placeholder='Password'
        secureTextEntry
      />
      <CustomButton title='Log in' style={styles.button} onPress={() => {}} />
      <TouchableOpacity>
        <Label style={styles.register}>Register</Label>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
    letterSpacing: 1,
    color: colors.greenMint,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
  register: {
    color: colors.greenMint,
    alignSelf: "center",
    marginTop: 30,
  },
});
