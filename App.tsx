import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./app/navigation/RootNavigator";
import { StatusBar } from "react-native";
import colors from "constants/colors";
import store from "store/index";

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={colors.greenMint} />
      <RootNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;
