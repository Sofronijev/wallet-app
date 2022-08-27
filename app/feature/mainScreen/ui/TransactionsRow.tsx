import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "constants/colors";
import Label from "components/Label";
import CategoryIcon from "components/CategoryIcon";
import { formatDecimalDigits } from "modules/numbers";
import { transactionCategories } from "modules/transactionCategories";
import { TransactionType } from "store/reducers/transactionsSlice";
import { formatDayString } from "modules/timeAndDate";

type Props = {
  transaction: TransactionType;
};

const TransactionsRow: React.FC<Props> = ({ transaction }) => {
  const category = transactionCategories[transaction.categoryId];
  const { label } = category.types[transaction.typeId];
  const hasDescription = !!transaction.description;
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <CategoryIcon categoryName={category.name} />
      </View>
      <View style={styles.descriptionContainer}>
        <Label numberOfLines={hasDescription ? 1 : 2} style={styles.label}>
          {`${formatDayString(transaction.date)} - ${label}`}
        </Label>
        {hasDescription && (
          <Label numberOfLines={1} style={styles.descriptionText}>
            {transaction.description}
          </Label>
        )}
      </View>
      <Label style={styles.price}>{formatDecimalDigits(transaction.amount)}</Label>
    </View>
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
});
