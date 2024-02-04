import { ListRenderItem, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import { useAppSelector } from "store/hooks";
import { getAllWallets } from "store/reducers/wallets/selectors";
import { Wallet, setActiveWallet } from "store/reducers/wallets/walletsSlice";
import Label from "components/Label";
import { formatDecimalDigits } from "modules/numbers";
import colors from "constants/colors";
import { useDispatch } from "react-redux";
import AppActivityIndicator from "components/AppActivityIndicator";
import { getUserId } from "store/reducers/userSlice";
import { useGetUserWalletsQuery, useSetWalletBalanceMutation } from "app/middleware/wallets";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Carousel from "components/Carousel";
import ButtonText from "components/ButtonText";
import { showBalancePrompt } from "feature/settingsScreen/modules";
import { formatIsoDate } from "modules/timeAndDate";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";

const WALLET_SPACING = 8;
const HORIZONTAL_PADDING = 16;

const walletKeyExtractor = (item: Wallet) => `${item.walletId}`;

const WalletList: React.FC = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();

  const userId = useAppSelector(getUserId);

  const { isLoading, isFetching } = useGetUserWalletsQuery(
    userId
      ? {
          userId,
        }
      : skipToken
  );
  const [tryAdjustBalance] = useSetWalletBalanceMutation();

  const wallets = useAppSelector(getAllWallets);
  const walletsArray = Object.values(wallets);

  const onWalletChange = (item: Wallet) => {
    dispatch(setActiveWallet(item.walletId));
  };

  const onBalancePress = (walletId: number) => {
    showBalancePrompt((value: string) => {
      // TODO - don't call endpoint if value is same as current balance
      return tryAdjustBalance({
        walletId,
        userId,
        // TODO - format, validate number
        value: parseFloat(value),
        date: formatIsoDate(new Date()),
      });
    });
  };

  const walletWidth = width - HORIZONTAL_PADDING * 2;

  const renderWallet: ListRenderItem<Wallet> = ({ item }) => {
    return (
      <View style={[styles.walletContainer, { borderColor: item.color }]}>
        <Label style={styles.walletName}>{item.walletName}</Label>
        <Label style={styles.balanceText}>Available balance</Label>
        <Label style={styles.walletValue}>{formatDecimalDigits(item.currentBalance)}</Label>
        <View style={styles.row}>
          <ButtonText
            title='Transfer funds'
            onPress={() => navigation.navigate("TransferForm", { walletId: item.walletId })}
            style={styles.button}
          />
          <ButtonText
            title='Adjust balance'
            onPress={() => onBalancePress(item.walletId)}
            style={styles.button}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      {!walletsArray.length ? (
        <View style={[styles.nullWallet, { width: walletWidth }]}></View>
      ) : (
        <Carousel
          data={walletsArray}
          renderItem={renderWallet}
          keyExtractor={walletKeyExtractor}
          itemWidth={walletWidth}
          itemSpacing={WALLET_SPACING}
          style={styles.walletCarousel}
          onSnapToItem={onWalletChange}
        />
      )}
      <AppActivityIndicator isLoading={isLoading || isFetching} />
    </>
  );
};

export default WalletList;

const walletStyle = {
  marginVertical: 20,
  padding: 10,
  borderRadius: 20,
  backgroundColor: colors.white,
  height: 170,
};

const styles = StyleSheet.create({
  walletCarousel: {
    paddingHorizontal: HORIZONTAL_PADDING,
    height: walletStyle.height + 40,
  },
  walletContainer: {
    ...walletStyle,
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  nullWallet: {
    ...walletStyle,
    marginHorizontal: HORIZONTAL_PADDING,
  },
  balanceText: {
    textAlign: "center",
    color: colors.grey2,
  },
  walletValue: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  walletName: {
    fontSize: 23,
    fontWeight: "bold",
    paddingBottom: 20,
    paddingLeft: 10,
  },
  transactionContainer: {
    marginHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 20,
    borderColor: colors.grey,
  },
});
