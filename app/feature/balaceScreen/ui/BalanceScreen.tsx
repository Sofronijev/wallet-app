import { Alert, FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import React from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import colors from "constants/colors";
import { useAppSelector } from "store/hooks";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserRecentTransactionsQuery } from "app/middleware/transactions";
import { getUserRecentTransactions } from "store/reducers/balance/selectors";
import { errorStrings } from "constants/strings";
import BalanceTransactionNullScreen from "./BalanceTransactionNullScreen";
import AddButton from "components/AddButton";
import { getActiveWallet } from "store/reducers/wallets/selectors";
import TransactionsRow from "feature/monthlyScreen/ui/TransactionsRow";
import { TransactionType } from "store/reducers/monthlyBalance/monthlyBalanceSlice";
import WalletList from "feature/wallet/ui/WalletList";
import Label from "components/Label";
import ButtonText from "components/ButtonText";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";

const renderTransaction: ListRenderItem<TransactionType> = ({ item }) => (
  <View style={styles.transactionContainer}>
    <TransactionsRow transaction={item} />
  </View>
);
const transactionKeyExtractor = (item: TransactionType) => `${item.id}`;

const BalanceScreen: React.FC = () => {
  const userId = useAppSelector(getUserId);
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();

  const navigateToTransactionSearch = () => {
    navigation.navigate("TransactionSearch");
  };

  const transactions = useAppSelector(getUserRecentTransactions);
  const activeWallet = useAppSelector(getActiveWallet);
  const walletId = activeWallet?.walletId;
  const hasTransactions = !!transactions.length;

  const { isError } = useGetUserRecentTransactionsQuery(
    userId && walletId
      ? {
          userId,
          walletIds: [walletId],
        }
      : skipToken,
    { refetchOnMountOrArgChange: true }
  );

  if (isError) {
    Alert.alert(errorStrings.general, errorStrings.tryAgain);
  }

  return (
    <>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={transactionKeyExtractor}
        ListEmptyComponent={<BalanceTransactionNullScreen />}
        ListHeaderComponent={
          <>
            <WalletList />
            {/* HACK - This is a 'header' for data that is rendered in flatlist */}
            {hasTransactions && (
              <Label style={styles.recentTransactionsText}>Recent transactions</Label>
            )}
          </>
        }
        ListFooterComponent={
          <>
            {/* HACK - This is a 'footer' for data that is rendered in flatlist */}
            {hasTransactions && (
              <View style={styles.allTransactionsBtn}>
                <ButtonText title='View all transactions' onPress={navigateToTransactionSearch} />
              </View>
            )}
          </>
        }
        contentContainerStyle={styles.container}
      />
      <AddButton />
    </>
  );
};

export default BalanceScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  walletContainer: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  balanceText: {
    textAlign: "center",
    color: colors.grey2,
  },
  walletValue: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  walletName: {
    fontSize: 23,
    fontWeight: "bold",
    paddingBottom: 20,
    paddingLeft: 10,
  },
  transactionContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  recentTransactionsText: {
    color: colors.black,
    backgroundColor: colors.white,
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 16,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  allTransactionsBtn: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
