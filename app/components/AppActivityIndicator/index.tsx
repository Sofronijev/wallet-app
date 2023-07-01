import { ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import colors from "constants/colors";

type AppActivityIndicatorProps = {
  isLoading: boolean;
  hideScreen?: boolean;
};

const AppActivityIndicator: React.FC<AppActivityIndicatorProps> = ({ isLoading, hideScreen }) => {
  if (!isLoading) return null;
  return (
    <ActivityIndicator
      style={[styles.activityIndicator, hideScreen && styles.hideScreen]}
      size='large'
      color={colors.greenMint}
    />
  );
};

export default AppActivityIndicator;

const styles = StyleSheet.create({
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
    opacity: 0.5,
  },
  hideScreen: {
    opacity: 1,
  },
});
