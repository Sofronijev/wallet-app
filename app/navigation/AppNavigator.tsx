import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";
import colors from "constants/colors";
import { AppStackParamList } from "./routes";
import TransactionForm from "feature/transaction/ui/TransactionForm";
import { transactionStrings } from "constants/strings";

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
        name='Transaction'
        component={TransactionForm}
        options={{
          animation: "slide_from_bottom",
          title: transactionStrings.addTransaction,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
