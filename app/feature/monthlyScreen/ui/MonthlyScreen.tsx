import { Alert, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { addOrDeductMonth, formatIsoDate } from "modules/timeAndDate";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetMonthlyUserTransactionsQuery } from "app/middleware/transactions";
import { errorStrings } from "constants/strings";
import ThisMonthBalance from "./ThisMonthBalance";
import RecentTransactions from "./RecentTransactions";
import TransactionsNullScreen from "./TransactionsNullScreen";
import AddButton from "components/AddButton";
import { getMonthlyTransactions } from "store/reducers/monthlyBalance/selectors";
import { getActiveWallet } from "store/reducers/wallets/selectors";

const MonthlyScreen: React.FC = () => {
  const userId = useAppSelector(getUserId);
  const [monthDifference, setMonthDifference] = useState(0);
  const today = new Date();
  const selectedDate = addOrDeductMonth(today, monthDifference);
  const transactions = useAppSelector(getMonthlyTransactions(selectedDate));
  const walletId = useAppSelector(getActiveWallet)?.walletId;

  const { isLoading, isError, isFetching, refetch } = useGetMonthlyUserTransactionsQuery(
    userId && walletId
      ? {
          userId,
          start: 0,
          count: 10,
          date: formatIsoDate(selectedDate),
          walletIds: [walletId],
        }
      : skipToken
  );
  const transactionLoading = isLoading || isFetching;

  useEffect(() => {
    refetch();
  }, [monthDifference]);

  if (isError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  const addMonth = () => {
    if (monthDifference === 0) return;
    setMonthDifference((prevMonth) => prevMonth + 1);
  };
  const deductMonth = () => {
    setMonthDifference((prevMonth) => prevMonth - 1);
  };
  const setCurrentMonth = () => {
    setMonthDifference(0);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ThisMonthBalance
          isLoading={transactionLoading}
          date={selectedDate}
          addMonth={addMonth}
          deductMonth={deductMonth}
          setCurrentMonth={setCurrentMonth}
          disableAddMonth={monthDifference === 0}
        />
        <RecentTransactions
          isLoading={transactionLoading}
          transactions={transactions}
          nullScreen={<TransactionsNullScreen isLoading={transactionLoading} />}
        />
      </ScrollView>
      <AddButton />
    </>
  );
};

export default MonthlyScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
