import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "constants/colors";

const ICON_SIZE = 28;

const getIcon = (type: string) => {
  switch (type) {
    case "income":
      return {
        icon: <FontAwesome name='money' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.money,
      };
    case "saving":
      return {
        icon: <MaterialCommunityIcons name='piggy-bank' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.saving,
      };
    case "gifts":
      return {
        icon: <FontAwesome5 name='gift' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.gift,
      };
    case "housing":
      return {
        icon: <Ionicons name='ios-home-sharp' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.housing,
      };
    case "utilities":
      return {
        icon: <MaterialCommunityIcons name='water-pump' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.utilities,
      };
    case "food":
      return {
        icon: <MaterialCommunityIcons name='food-apple' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.food,
      };
    case "transportation":
      return {
        icon: <FontAwesome5 name="car" size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.transportation,
      };
    case "health":
      return {
        icon: <MaterialCommunityIcons name='pill' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.health,
      };
    case "dailyLiving":
      return {
        icon: <MaterialCommunityIcons name='human-greeting' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.dailyLiving,
      };
    case "children":
      return {
        icon: <MaterialCommunityIcons name='baby-carriage' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.children,
      };
    case "obligation":
      return {
        icon: <FontAwesome5 name='credit-card' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.obligations,
      };
    case "entertainment":
      return {
        icon: <Fontisto name='smiley' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.entertainment,
      };
    case "other":
      return {
        icon: <MaterialIcons name='attach-money' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.otherCategory,
      };
    default:
      return {
        icon: <MaterialIcons name='attach-money' size={ICON_SIZE} color={colors.white} />,
        backgroundColor: colors.otherCategory,
      };
  }
};

type Props = {
  type: string;
};

const CategoryIcon: React.FC<Props> = ({ type }) => {
  const { icon, backgroundColor } = getIcon(type);

  return <View style={[styles.container, { backgroundColor }]}>{icon}</View>;
};

export default CategoryIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 7,
  },
});
