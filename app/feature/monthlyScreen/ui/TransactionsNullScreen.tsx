import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "constants/colors";
import AppActivityIndicator from "components/AppActivityIndicator";

type TransactionNullScreenProps = {
    isLoading: boolean;
};

const TransactionsNullScreen: React.FC<TransactionNullScreenProps> = ({isLoading}) => {
  return (
    <View style={styles.container}>
      <Ionicons name='wallet-outline' size={100} color={colors.greyNullScreen} />
      <Text>No transactions for this month</Text>
      <AppActivityIndicator isLoading={isLoading} hideScreen />
    </View>
  );
};

export default TransactionsNullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});
