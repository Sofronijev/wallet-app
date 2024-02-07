import { Alert, StyleSheet, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { clearUserData, getUserData } from "store/reducers/userSlice";
import CustomButton from "components/CustomButton";
import Label from "components/Label";
import authStorage from "modules/authStorage";
import ButtonText from "components/ButtonText";
import { useDeleteUserMutation } from "app/middleware/auth";
import { errorStrings } from "constants/strings";
import { showDeleteUserDataALert, showLogoutAlert } from "../modules";
import AppActivityIndicator from "components/AppActivityIndicator";
import SettingsListItem from "./SettingsListItem";
import { Ionicons } from "@expo/vector-icons";
import colors from "constants/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "navigation/routes";

type SettingsScreenProps = {};

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [tryDeleteUser, { isLoading }] = useDeleteUserMutation();

  const settingsListItems = [
    {
      id: 1,
      title: "Wallets",
      icon: <Ionicons name='wallet-outline' size={24} color={colors.black} />,
      onPress: () => navigation.navigate("WalletSettings"),
    },
  ];

  const logout = async () => {
    dispatch(clearUserData());
    await authStorage.removeRefreshToken();
  };

  const deleteUser = async () => {
    try {
      await tryDeleteUser(user.id).unwrap();
      logout();
    } catch (error) {
      Alert.alert(errorStrings.general, error.data?.message || errorStrings.tryAgain);
    }
  };

  const renderItems = () =>
    settingsListItems.map((item) => (
      <SettingsListItem key={item.id} title={item.title} icon={item.icon} onPress={item.onPress} />
    ));
  const onLogout = () => showLogoutAlert(logout);
  const onDeleteUserData = () => showDeleteUserDataALert(deleteUser);

  return (
    <View style={styles.container}>
      <Label style={styles.email}>{user.email}</Label>
      {renderItems()}
      <CustomButton type='danger' title='Sign out' onPress={onLogout} style={styles.signOut} />
      <ButtonText
        title='Delete account'
        onPress={onDeleteUserData}
        type='danger'
        style={styles.deleteData}
      />
      <AppActivityIndicator isLoading={isLoading} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  email: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  deleteData: {
    paddingTop: 10,
    alignSelf: "center",
  },
  signOut: {
    marginTop: 20,
  },
});
