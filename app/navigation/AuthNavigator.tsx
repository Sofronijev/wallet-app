import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "screens/RegisterScreen";
import { AuthStackParamList } from "./routes";
import LoginForm from "feature/auth/LoginForm";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginForm} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
