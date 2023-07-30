import { Alert, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";
import CustomButton from "components/CustomButton";
import { addOrDeductMonth, formatIsoDate, getMonth } from "modules/timeAndDate";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetMonthlyUserTransactionsQuery } from "app/middleware/transactions";
import { errorStrings } from "constants/strings";
import ThisMonthBalance from "./ThisMonthBalance";
import RecentTransactions from "./RecentTransactions";
import { getMonthlyTransactions } from "store/reducers/transactionsSlice";
import TransactionsNullScreen from "./TransactionsNullScreen";

type MonthlyScreenProps = {
  navigation: StackNavigationProp<AppStackParamList>;
};

const MonthlyScreen: React.FC<MonthlyScreenProps> = ({ navigation }) => {
  const userId = useAppSelector(getUserId);
  const [monthDifference, setMonthDifference] = useState(0);
  const today = new Date();
  const selectedDate = addOrDeductMonth(today, monthDifference);
  const monthName = getMonth(selectedDate);

  const { isLoading, isError, isFetching, refetch } = useGetMonthlyUserTransactionsQuery(
    userId
      ? {
          userId,
          start: 0,
          count: 10,
          date: formatIsoDate(selectedDate),
        }
      : skipToken
  );
  const transactionLoading = isLoading || isFetching;
  const transactions = useAppSelector(getMonthlyTransactions);

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
    <ScrollView style={styles.container}>
      <ThisMonthBalance
        isLoading={transactionLoading}
        date={selectedDate}
        addMonth={addMonth}
        deductMonth={deductMonth}
        setCurrentMonth={setCurrentMonth}
        disableAddMonth={monthDifference === 0}
      />
      <CustomButton
        style={styles.button}
        title='New transaction'
        onPress={() => navigation.navigate("Transaction")}
      />
      <RecentTransactions
        isLoading={transactionLoading}
        transactions={transactions}
        title={`Last ${monthName} transactions`}
        nullScreen={<TransactionsNullScreen isLoading={isLoading} />}
      />
    </ScrollView>
  );
};

export default MonthlyScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
