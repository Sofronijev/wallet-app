import { Alert, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { StackNavigationProp } from "@react-navigation/stack";
import ThisMonthBalance from "feature/mainScreen/ui/ThisMonthBalance";
import RecentTransactions from "feature/mainScreen/ui/RecentTransactions";
import colors from "constants/colors";
import { AppStackParamList } from "navigation/routes";
import CustomButton from "components/CustomButton";
import { addOrDeductMonth, formatIsoDate } from "modules/timeAndDate";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetMonthlyUserTransactionsQuery } from "app/middleware/transactions";
import { errorStrings } from "constants/strings";

type MainScreenProps = {
  navigation: StackNavigationProp<AppStackParamList>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const userId = useAppSelector(getUserId);
  const [monthDifference, setMonthDifference] = useState(0);
  const today = new Date();
  const selectedMonth = addOrDeductMonth(today, monthDifference);

  const { isLoading, isError, isFetching, refetch } = useGetMonthlyUserTransactionsQuery(
    userId
      ? {
          userId,
          start: 0,
          count: 10,
          date: formatIsoDate(selectedMonth),
        }
      : skipToken
  );
  const transactionLoading = isLoading || isFetching;

  useEffect(() => {
    refetch();
  }, [monthDifference]);

  useEffect(() => {
    if (isError) {
      Alert.alert(errorStrings.general, errorStrings.tryAgain);
    }
  }, [isError]);

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
        selectedMonth={selectedMonth}
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
      <RecentTransactions isLoading={transactionLoading} />
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
