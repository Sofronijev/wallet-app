import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./routes";
import LoginForm from "feature/auth/ui/LoginForm";
import RegisterForm from "feature/auth/ui/RegisterForm";
import colors from "constants/colors";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerShadowVisible: false,
        title: "",
      }}
    >
      <Stack.Screen name='Login' component={LoginForm} options={{ headerShown: false }} />
      <Stack.Screen
        name='Register'
        component={RegisterForm}
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
