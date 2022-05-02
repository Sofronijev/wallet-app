import React from "react";
import { useAppSelector } from "../redux/hooks";
import { getUserData, isUserLoggedIn } from "../redux/reducers/userSlice";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

const RootNavigator = () => {
  const isLoggedIn = useAppSelector(isUserLoggedIn);

  if (isLoggedIn) {
    return <AppNavigator />;
  }
  return <AuthNavigator />;
};

export default RootNavigator;
