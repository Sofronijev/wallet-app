import { ResponseError } from "modules/types";
import { Alert } from "react-native";

export const handleTransactionError = (error: ResponseError) => {
  if (error.status === 422) {
    return Alert.alert(error.data.message, "Transaction does not exist");
  }
  Alert.alert("An error occurred while adding transaction", "Please try again");
};

export const deleteTransactionAlert = (onPress: () => void) => {
  Alert.alert("Are you sure you want to delete this transaction?", "", [
    {
      text: "Cancel",
      style: "cancel",
    },
    { text: "Delete", onPress, style: "destructive" },
  ]);
};
