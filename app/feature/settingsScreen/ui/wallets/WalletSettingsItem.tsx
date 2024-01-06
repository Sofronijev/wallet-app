import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAppSelector } from "store/hooks";
import { getWalletById } from "store/reducers/wallets/selectors";
import colors from "constants/colors";
import { formatDecimalDigits } from "modules/numbers";
import ButtonText from "components/ButtonText";
import {
  useSetWalletBalanceMutation,
  useSetWalletStartingBalanceMutation,
} from "app/middleware/wallets";
import { getUserId } from "store/reducers/userSlice";
import { showBalancePrompt, showStartingBalancePrompt } from "feature/settingsScreen/modules";
import { formatIsoDate } from "modules/timeAndDate";

type Props = {
  walletId: number;
};

const WalletSettingsItem: React.FC<Props> = ({ walletId }) => {
  const wallet = useAppSelector(getWalletById(walletId));
  const userId = useAppSelector(getUserId);
  if (!wallet) return null;
  const [trySetStartingBalance, { isLoading }] = useSetWalletStartingBalanceMutation();
  const [tryAdjustBalance] = useSetWalletBalanceMutation();

  const onStartingBalancePress = () => {
    showStartingBalancePrompt((value: string) =>
      trySetStartingBalance({
        walletId,
        userId,
        // TODO - format, validate number
        value: parseFloat(value),
      })
    );
  };

  const onBalancePress = () => {
    showBalancePrompt((value: string) =>
      {
        // TODO - don't call endpoint if value is same as current balance
        return tryAdjustBalance({
          walletId,
          userId,
          // TODO - format, validate number
          value: parseFloat(value),
          date: formatIsoDate(new Date()),
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{wallet.walletName}</Text>
      <View style={styles.row}>
        <Text style={styles.titleText}>Balance:</Text>
        <ButtonText
          title={formatDecimalDigits(wallet.currentBalance)}
          type='link'
          onPress={onBalancePress}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.titleText}>Starting balance:</Text>
        <ButtonText
          title={formatDecimalDigits(wallet.startingBalance)}
          type='link'
          onPress={onStartingBalancePress}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.titleText}>Currency:</Text>
        <Text>
          {wallet.currencyCode} {wallet.currencySymbol}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.titleText}>Color:</Text>
        <Text>{wallet.color}</Text>
      </View>
    </View>
  );
};

export default WalletSettingsItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.grey,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  titleText: {},
});
