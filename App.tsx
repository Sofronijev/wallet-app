import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./app/redux/store";
import RootNavigator from "./app/navigation/RootNavigator";

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;
