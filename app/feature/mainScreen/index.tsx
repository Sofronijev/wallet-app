import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { StackNavigationProp } from "@react-navigation/stack";
import ThisMonthBalance from "feature/mainScreen/ui/ThisMonthBalance";
import RecentTransactions from "feature/mainScreen/ui/RecentTransactions";
import colors from "constants/colors";
import { AppStackParamList } from "navigation/routes";
import CustomButton from "components/CustomButton";
import { useGetMonthlyUserTransactionsQuery } from "app/middleware/apiSlice";
import { formatIsoDate } from "modules/timeAndDate";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import AppActivityIndicator from "components/AppActivityIndicator";

type MainScreenProps = {
  navigation: StackNavigationProp<AppStackParamList>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const user_id = useAppSelector(getUserId);
  const { isLoading, isError } = useGetMonthlyUserTransactionsQuery(
    user_id
      ? {
          user_id,
          start: 0,
          count: 10,
          date: formatIsoDate(new Date()),
        }
      : skipToken
  );

  return (
    <ScrollView style={styles.container}>
      <ThisMonthBalance />
      <CustomButton
        style={styles.button}
        title='New transaction'
        onPress={() => navigation.navigate("Transaction")}
      />
      <RecentTransactions />
      <AppActivityIndicator isLoading={isLoading} hideScreen />
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
