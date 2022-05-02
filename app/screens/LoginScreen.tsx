import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Label from "../components/Label";
import LabelInput from "../components/LabelInput";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import { RootParamList } from "../navigation/routes";
import { useLoginUserMutation } from "../api/apiSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<RootParamList, "Login">;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tryLoginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const onLogin = async () => {
    try {
      await tryLoginUser({ email, password }).unwrap();
    } catch (err) {
      const u = err as { data: string };
      console.log(u.data);
    }
  };

  return (
    <View style={styles.container}>
      <Label style={styles.text}>Welcome</Label>
      <LabelInput
        style={styles.input}
        icon={<FontAwesome name='user-o' size={24} color={colors.greenMint} />}
        placeholder='Email'
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />
      <LabelInput
        icon={<Ionicons name='ios-key-outline' size={24} color={colors.greenMint} />}
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* <Label>{error}</Label> */}
      <CustomButton title='Log in' style={styles.button} onPress={onLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Label style={styles.register}>Register</Label>
      </TouchableOpacity>
      {isLoading && <AppActivityIndicator />}
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
