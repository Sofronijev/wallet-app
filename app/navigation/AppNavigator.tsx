import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeHavigator";
import ExpenseFormScreen from "screens/ExpenseFormScreen";
import colors from "constants/colors";
import { AppStackParamList } from "./routes";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.greenMint,
        },
        headerTitleAlign: "center",
        headerTitleStyle: { color: colors.white },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen name='Home' component={HomeNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name='Expense'
        component={ExpenseFormScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
