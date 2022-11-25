import { userAuthErrorStrings } from "constants/strings";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { Alert } from "react-native";
import { UserDataType } from "store/reducers/userSlice";

type UserTokenType = {
  exp: number;
  iat: number;
  userData: UserDataType;
};

const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";
const ACCESS_TOKEN_STORAGE_KEY = "access_token";

const storeRefreshToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, token);
  } catch (error) {
    Alert.alert(userAuthErrorStrings.storeData, JSON.stringify(error));
  }
};

const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY);
  } catch (error) {
    Alert.alert(userAuthErrorStrings.readData);
  }
};

const getUser = async (): Promise<UserTokenType | null> => {
  const token = await getRefreshToken();
  return token ? jwtDecode(token) : null;
};

const removeRefreshToken = async () => {
  try {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
  } catch (error) {
    Alert.alert(userAuthErrorStrings.removeData);
  }
};

const storeAccessToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN_STORAGE_KEY, token);
  } catch (error) {
    Alert.alert(userAuthErrorStrings.storeData, JSON.stringify(error));
  }
};

const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_STORAGE_KEY);
  } catch (error) {
    Alert.alert(userAuthErrorStrings.readData);
  }
};

export default {
  storeRefreshToken,
  getRefreshToken,
  getUser,
  removeRefreshToken,
  storeAccessToken,
  getAccessToken,
};
