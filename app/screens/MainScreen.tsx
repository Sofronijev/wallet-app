import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "navigation/routes";
import ThisMonthBalance from "feature/main/ThisMonthBalance";
import RecentTransactions from "feature/main/RecentTransactions";
import colors from "constants/colors";
import AddTransactions from "feature/main/AddTransactions";

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, "Main">;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <ThisMonthBalance />
      <AddTransactions />
      <RecentTransactions />
    </ScrollView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
});
