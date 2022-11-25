import { deleteUserDataStrings, logoutAlertStrings } from "constants/strings";
import { Alert } from "react-native";

export const showLogoutAlert = (onLogout: () => void) => {
  Alert.alert(
    logoutAlertStrings.title,
    "",
    [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: onLogout,
      },
    ],
    {
      cancelable: true,
    }
  );
};

export const showDeleteUserDataALert = (onDelete: () => void) => {
    Alert.alert(
      deleteUserDataStrings.title,
      deleteUserDataStrings.subtitle,
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };
