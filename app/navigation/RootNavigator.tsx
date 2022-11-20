import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import authStorage from "modules/authStorage";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getUserData, setUserData } from "store/reducers/userSlice";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    try {
      const user = await authStorage.getUser();
      if (user) dispatch(setUserData(user.userData));
    } catch (e) {
      console.warn(e);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {user.id ? <AppNavigator /> : <AuthNavigator />}
    </View>
  );
};

export default RootNavigator;
