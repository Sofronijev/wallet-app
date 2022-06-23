
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import authStorage from "modules/authStorage";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getUserData, setUserData } from "store/reducers/userSlice";

const RootNavigator = () => {
  const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);
  const finishedRestoreUser = () => setIsReady(true);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) dispatch(setUserData(user.userData));
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={finishedRestoreUser}
        onError={finishedRestoreUser}
      />
    );

  if (user) {
    return <AppNavigator />;
  }
  return <AuthNavigator />;
};

export default RootNavigator;
