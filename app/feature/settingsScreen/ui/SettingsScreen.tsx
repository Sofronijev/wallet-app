import { Alert, StyleSheet, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { clearUserData, getUserData } from "store/reducers/userSlice";
import CustomButton from "components/CustomButton";
import Label from "components/Label";
import authStorage from "modules/authStorage";
import ButtonText from "components/ButtonText";
import { useDeleteUserMutation } from "app/middleware/auth";
import { errors } from "constants/strings";
import { showDeleteUserDataALert, showLogoutAlert } from "../modules";
import AppActivityIndicator from "components/AppActivityIndicator";

type SettingsScreenProps = {};

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [tryDeleteUser, { isLoading }] = useDeleteUserMutation();

  const logout = async () => {
    dispatch(clearUserData());
    await authStorage.removeRefreshToken();
  };

  const deleteUser = async () => {
    try {
      await tryDeleteUser(user.id).unwrap();
      logout();
    } catch (error) {
      Alert.alert(errors.general, error.data?.message || errors.tryAgain);
    }
  };

  const onLogout = () => showLogoutAlert(logout);
  const onDeleteUserData = () => showDeleteUserDataALert(deleteUser)

  return (
    <View style={styles.container}>
      <Label style={styles.email}>{user.email}</Label>
      <CustomButton type='danger' title='Sign out' onPress={onLogout} />
      <ButtonText
        title='Delete user data'
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
});
