import { alertButton, errors, transactions } from "constants/strings";
import { ResponseError } from "modules/types";
import { Alert } from "react-native";

export const handleTransactionError = (error: ResponseError) => {
  if (error.status === 422) {
    return Alert.alert(error.data.message, transactions.noTransaction);
  }
  Alert.alert(transactions.errorAdding, errors.tryAgain);
};

export const deleteTransactionAlert = (onPress: () => void) => {
  Alert.alert(transactions.deleteTransaction, "", [
    {
      text: alertButton.cancel,
      style: "cancel",
    },
    { text: alertButton.delete, onPress, style: "destructive" },
  ]);
};
