import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Label from "components/Label";
import colors from "constants/colors";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserBalanceQuery } from "app/middleware/transactions";
import { getUserBalance, getUserRecentTransactions } from "store/reducers/balance/selectiors";
import { formatDecimalDigits } from "modules/numbers";
import { errorStrings } from "constants/strings";
import AppActivityIndicator from "components/AppActivityIndicator";
import RecentTransactions from "feature/monthlyScreen/ui/RecentTransactions";
import BalanceTransactionNullScreen from "./BalanceTransactionNullScreen";
import AddButton from "components/AddButton";

const BalanceScreen: React.FC = () => {

  const userId = useAppSelector(getUserId);
  const { isLoading, isError, isFetching } = useGetUserBalanceQuery(
    userId
      ? {
          userId,
        }
      : skipToken
  );

  const userBalance = useAppSelector(getUserBalance);
  const transactions = useAppSelector(getUserRecentTransactions);

  if (isError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.balanceContainer}>
          <Label style={styles.balanceText}>Available balance</Label>
          <Label style={styles.balanceValue}>{formatDecimalDigits(userBalance)}</Label>
        </View>
        <RecentTransactions
          isLoading={isLoading || isFetching}
          transactions={transactions}
          title='Recent transactions'
          nullScreen={<BalanceTransactionNullScreen />}
        />
        <AppActivityIndicator isLoading={isLoading || isFetching} />
      </ScrollView>
      <AddButton />
    </>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  balanceContainer: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  balanceText: {
    textAlign: "center",
    color: colors.grey2,
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
