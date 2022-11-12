import { StyleSheet, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { clearUserData, getUserData } from "store/reducers/userSlice";
import CustomButton from "components/CustomButton";
import Label from "components/Label";
import authStorage from "modules/authStorage";
import ButtonText from "components/ButtonText";
import { useDeleteUserMutation } from "app/middleware/auth";

type SettingsScreenProps = {};

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [tryDeleteUser, { isLoading, isError }] = useDeleteUserMutation();

  const onDeleteUser = async () => {
    try {
      await tryDeleteUser(user.id).unwrap();
      // TODO - delete token and user data ( sign out)
    } catch (error) {
      console.log(error.data.message)
    }
  };

  const logout = async () => {
    dispatch(clearUserData());
    await authStorage.removeRefreshToken();
  };
  return (
    <View style={styles.container}>
      <Label style={styles.email}>{user.email}</Label>
      <CustomButton type='danger' title='Sign out' onPress={logout} />
      <ButtonText
        title='Delete user data'
        onPress={onDeleteUser}
        type='danger'
        style={styles.deleteData}
      />
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
