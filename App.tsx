import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./app/redux/store";
import RootNavigator from "./app/navigation/RootNavigator";
import { StatusBar } from "react-native";
import colors from "constants/colors";

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={colors.greenMint} />
      <RootNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;
