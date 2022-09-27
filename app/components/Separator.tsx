import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "constants/colors";

const Separator: React.FC = () => {
  return <View style={styles.border}></View>;
};

export default Separator;

const styles = StyleSheet.create({
    border: {
        borderBottomWidth: 1,
        borderColor: colors.grey,
    }
});
