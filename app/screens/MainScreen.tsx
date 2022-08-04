import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import ThisMonthBalance from "feature/main/ThisMonthBalance";
import RecentTransactions from "feature/main/RecentTransactions";
import colors from "constants/colors";
import AddTransactions from "feature/main/AddTransactions";


const MainScreen: React.FC = () => {
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
