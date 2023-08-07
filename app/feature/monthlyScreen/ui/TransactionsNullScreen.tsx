import { StyleSheet, View } from "react-native";
import React from "react";
import NullScreen from "components/NullScreen";

type TransactionNullScreenProps = {
  isLoading: boolean;
};

const TransactionsNullScreen: React.FC<TransactionNullScreenProps> = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      <NullScreen isLoading={isLoading} title='No transactions for this month' icon='wallet' />
    </View>
  );
};

export default TransactionsNullScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
});
