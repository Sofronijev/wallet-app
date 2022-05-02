import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from "navigation/routes";
import LoginForm from "feature/auth/LoginForm";

type Props = {
  navigation: StackNavigationProp<RootParamList, "Login">;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return <LoginForm navigation={navigation} />;
};

export default LoginScreen;
