import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name='Login' component={MainScreen} />
      <Stack.Screen name='Register' component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
