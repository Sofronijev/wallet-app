import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import authStorage from "modules/authStorage";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getUserData, setUserData } from "store/reducers/userSlice";
import { View } from "react-native";
import { extendedClient, initializeDb } from "dbClient";
import Label from "components/Label";

SplashScreen.preventAutoHideAsync();

const RootNavigator: React.FC = () => {
  // const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);
  const users = extendedClient.users.useFindFirst();
  const cateogry = extendedClient.categories.useFindFirst();
  console.log(cateogry);

  // const restoreUser = async () => {
  //   try {
  //     const user = await authStorage.getUser();
  //     if (user) dispatch(setUserData(user.userData));
  //   } catch (e) {
  //     // TODO - fix this
  //     console.warn(e);
  //   } finally {
  //     setIsReady(true);
  //   }
  // };

  // useEffect(() => {
  //   restoreUser();
  // }, []);

  useEffect(() => {
    const setup = async () => {
      try {
        await initializeDb();
      } catch (error) {
        // TODO - handle errors
        console.log(error);
      } finally {
        setIsReady(true);
      }
    };
    setup();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Label>{cateogry?.name || "Ne radi baza :/"}</Label>
      <AppNavigator />
      {/* {user.id ? <AppNavigator /> : <AuthNavigator />} */}
    </View>
  );
};

export default RootNavigator;
