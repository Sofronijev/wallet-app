import AppLoading from "expo-app-loading";
import authStorage from "modules/authStorage";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { getUserData, setUserData } from "redux/reducers/userSlice";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

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
