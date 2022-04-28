import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import Label from "../components/Label";
import LabelInput from "../components/LabelInput";
import colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../navigation/routes";

type Props = {
  navigation: NavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Label style={styles.text}>Welcome</Label>
      <LabelInput
        style={styles.input}
        icon={<FontAwesome name='user-o' size={24} color={colors.greenMint} />}
        placeholder='Email'
        keyboardType='email-address'
        value={username}
        onChangeText={setUsername}
      />
      <LabelInput
        icon={<Ionicons name='ios-key-outline' size={24} color={colors.greenMint} />}
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton
        title='Log in'
        style={styles.button}
        onPress={() => {
          console.log(username, password);
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
