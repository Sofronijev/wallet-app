import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import ThisMonthBalance from "feature/mainScreen/ui/ThisMonthBalance";
import RecentTransactions from "feature/mainScreen/ui/RecentTransactions";
import colors from "constants/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";
import CustomButton from "components/CustomButton";

type MainScreenProps = {
  navigation:  StackNavigationProp<AppStackParamList>
}

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <ThisMonthBalance />
      <CustomButton
        style={styles.button}
        title='New transaction'
        onPress={() => navigation.navigate("Transaction")}
      />
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
  button: {
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
