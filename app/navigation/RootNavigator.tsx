import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./AppNavigator";
import { View } from "react-native";
import { extendedClient, initializeDb } from "dbClient";

SplashScreen.preventAutoHideAsync();

const RootNavigator: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const users = extendedClient.users.useFindFirst();
  const cateogry = extendedClient.categories.useFindFirst();
  console.log(cateogry);

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
      <AppNavigator />
    </View>
  );
};

export default RootNavigator;
