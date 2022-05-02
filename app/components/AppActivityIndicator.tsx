import { ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import colors from "../constants/colors";

type AppActivitiIndicatorProps = {};

const AppActivityIndicator: React.FC<AppActivitiIndicatorProps> = () => {
  return (
    <ActivityIndicator style={styles.activityIndicator} size='large' color={colors.greenMint} />
  );
};

export default AppActivityIndicator;

const styles = StyleSheet.create({
  activityIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
    opacity: 0.5,
  },
});
