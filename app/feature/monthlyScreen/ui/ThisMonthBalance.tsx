import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Label from "components/Label";
import colors from "constants/colors";
import { getMonthAndYear } from "modules/timeAndDate";
import { formatDecimalDigits } from "modules/numbers";
import { useAppSelector } from "store/hooks";
import AppActivityIndicator from "components/AppActivityIndicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { transactionStrings } from "constants/strings";
import { getMonthlyBalance } from "store/reducers/monthlyBalance/selectors";
import { getActiveWallet } from "store/reducers/wallets/selectors";

type ThisMonthBalanceProps = {
  isLoading: boolean;
  date: Date;
  disableAddMonth: boolean;
  addMonth: () => void;
  deductMonth: () => void;
  setCurrentMonth: () => void;
};

const ThisMonthBalance: React.FC<ThisMonthBalanceProps> = ({
  isLoading,
  date,
  disableAddMonth,
  addMonth,
  deductMonth,
  setCurrentMonth,
}) => {
  const { income, expense, balance } = useAppSelector(getMonthlyBalance(date));
  const formattedMonth = getMonthAndYear(date);
  const activeWallet = useAppSelector(getActiveWallet);
  const walletName = activeWallet?.walletName ?? "";

  return (
    <View style={styles.container}>
      <Label style={styles.walletName}>{walletName}</Label>
      <View style={[styles.row, styles.titleContainer]}>
        <Label style={styles.title}>{formattedMonth}</Label>
        <View style={styles.icons}>
          <TouchableOpacity onPress={deductMonth} style={styles.icon}>
            <FontAwesome name='chevron-left' size={25} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={setCurrentMonth} style={styles.icon}>
            <MaterialCommunityIcons name='calendar-today' size={25} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={addMonth} style={styles.icon} disabled={disableAddMonth}>
            <FontAwesome
              name='chevron-right'
              size={25}
              color={disableAddMonth ? colors.disabled : colors.black}
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
        <AppActivityIndicator isLoading={isLoading} hideScreen />
      </View>
    </View>
  );
};

export default ThisMonthBalance;

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
