import { StyleSheet, View } from "react-native";
import React from "react";
import NullScreen from "components/NullScreen";

const BalanceTransactionNullScreen: React.FC = ({}) => {
  return (
    <View style={styles.container}>
      <NullScreen
        icon='chart'
        title="Let's Get Started!"
        subtitle='Start tracking your expenses and incomes to gain better control of your finances. Tap the
          plus sign (+) button to add your first transaction and begin your financial journey with us!'
      />
    </View>
  );
};

export default BalanceTransactionNullScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
});
