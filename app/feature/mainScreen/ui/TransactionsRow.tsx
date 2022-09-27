import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "constants/colors";
import Label from "components/Label";
import CategoryIcon from "components/CategoryIcon";
import { formatDecimalDigits } from "modules/numbers";
import { CategoryNumber, transactionCategories } from "modules/transactionCategories";
import { TransactionType } from "store/reducers/transactionsSlice";
import { formatDayString } from "modules/timeAndDate";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";
import { transactions } from "constants/strings";

type Props = {
  transaction: TransactionType;
};

const TransactionsRow: React.FC<Props> = ({ transaction }) => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  const category = transactionCategories[transaction.categoryId];
  const type = category.types[transaction.typeId];
  const hasDescription = !!transaction.description;
  const isIncome = transaction.categoryId === CategoryNumber.income;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Transaction", {
          editData: {
            id: transaction.id,
            date: transaction.date,
            amount: `${transaction.amount}`,
            description: transaction.description,
            category,
            type,
          },
        })
      }
    >
      <View style={styles.icon}>
        <CategoryIcon categoryName={category.name} />
      </View>
      <View style={styles.descriptionContainer}>
        <Label numberOfLines={hasDescription ? 1 : 2} style={styles.label}>
          {`${formatDayString(transaction.date)} - ${type?.label}`}
        </Label>
        {hasDescription && (
          <Label numberOfLines={1} style={styles.descriptionText}>
            {transaction.description}
          </Label>
        )}
      </View>
      <Label style={[styles.price, isIncome && styles.incomeColor]}>
        {`${transactions.showMinus(isIncome)}${formatDecimalDigits(transaction.amount)}`}
      </Label>
    </TouchableOpacity>
  );
};

export default TransactionsRow;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  icon: {
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 20,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flex: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 16,
  },
  incomeColor: {
    color: colors.greenMint,
  }
});
