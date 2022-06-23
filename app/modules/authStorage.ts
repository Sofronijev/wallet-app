import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { Alert } from "react-native";
import { UserDataType } from "store/reducers/userSlice";

type UserTokenType = {
  exp: number,
  iat: number,
  userData: UserDataType;
}

const TOKEN_STORAGE_KEY = "access_token";

const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, token);
  } catch (error) {
    Alert.alert("Error with storing user data", JSON.stringify(error));
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
  } catch (error) {
    Alert.alert("Error with reading user data");
  }
};

const getUser = async (): Promise<UserTokenType | null> => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
  } catch (error) {
    Alert.alert("Error with removing user data");
  }
};

export default {
  storeToken,
  getToken,
  getUser,
  removeToken,
};
