import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "navigation/routes";

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, "Main">;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>MainScreen</Text>
      <Button title='Go to Details' />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
