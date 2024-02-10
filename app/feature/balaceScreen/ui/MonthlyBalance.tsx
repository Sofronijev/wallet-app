import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Label from "components/Label";
import colors from "constants/colors";
import { addOrDeductMonth, formatIsoDate, getMonthAndYear } from "modules/timeAndDate";
import { formatDecimalDigits } from "modules/numbers";
import { useAppSelector } from "store/hooks";
import AppActivityIndicator from "components/AppActivityIndicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { transactionStrings } from "constants/strings";
import { getMonthlyBalance } from "store/reducers/monthlyBalance/selectors";
import { getActiveWallet } from "store/reducers/wallets/selectors";
import { useGetMonthlyUserTransactionsQuery } from "app/middleware/transactions";
import { getUserId } from "store/reducers/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const TODAY = new Date();

const MonthlyBalance: React.FC = () => {
  const [monthDifference, setMonthDifference] = useState(0);

  const walletId = useAppSelector(getActiveWallet)?.walletId;
  const userId = useAppSelector(getUserId);

  const selectedDate = addOrDeductMonth(TODAY, monthDifference);
  const { income, expense, balance } = useAppSelector(getMonthlyBalance(selectedDate));

  const formattedMonth = getMonthAndYear(selectedDate);
  const disableNextMonthBtn = monthDifference === 0;

  const { isLoading, isError, isFetching } = useGetMonthlyUserTransactionsQuery(
    userId && walletId
      ? {
          userId,
          start: 0,
          count: 10,
          date: formatIsoDate(selectedDate),
          walletIds: [walletId],
        }
      : skipToken,
    { refetchOnMountOrArgChange: true }
  );
  const isMonthlyLoading = isLoading || isFetching;

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
    <View style={styles.container}>
      <View style={[styles.row, styles.titleContainer]}>
        <Label style={styles.title}>{formattedMonth}</Label>
        <View style={styles.icons}>
          <TouchableOpacity onPress={deductMonth} style={styles.icon}>
            <FontAwesome name='chevron-left' size={25} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={setCurrentMonth} style={styles.icon}>
            <MaterialCommunityIcons name='calendar-today' size={25} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={addMonth} style={styles.icon} disabled={disableNextMonthBtn}>
            <FontAwesome
              name='chevron-right'
              size={25}
              color={disableNextMonthBtn ? colors.disabled : colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.row}>
          <Label style={styles.label}>{transactionStrings.available}</Label>
          <Label style={[styles.balance, balance < 0 && styles.redBalance]}>
            {formatDecimalDigits(balance)}
          </Label>
        </View>
        <View style={styles.row}>
          <Label style={styles.label}>{transactionStrings.income}</Label>
          <Label style={styles.transactions}>{formatDecimalDigits(income)}</Label>
        </View>
        <View style={styles.row}>
          <Label style={styles.label}>{transactionStrings.expenses}</Label>
          <Label style={styles.transactions}>{formatDecimalDigits(expense)}</Label>
        </View>
        <AppActivityIndicator isLoading={isMonthlyLoading} />
      </View>
    </View>
  );
};

export default MonthlyBalance;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.black,
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    paddingLeft: 8,
  },
  balance: {
    fontSize: 30,
    textAlign: "right",
    color: colors.greenMint,
    fontWeight: "bold",
  },
  redBalance: {
    color: colors.redDark,
  },
  label: {
    fontSize: 18,
    color: colors.grey2,
  },
  transactions: {
    fontSize: 28,
    textAlign: "right",
    fontWeight: "bold",
    color: colors.black,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  walletName: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 5,
    paddingLeft: 30,
  },
});
