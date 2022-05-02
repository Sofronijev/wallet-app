import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "screens/MainScreen";
import DetailsScreen from "screens/DetailsScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "constants/colors";

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName='Main'
    screenOptions={{
      tabBarActiveTintColor: colors.greenMint,
      headerStyle: {
        backgroundColor: colors.greenMint,
      },
      headerTitleAlign: "center",
      headerTitleStyle: { color: colors.white },
    }}
  >
    <Tab.Screen
      name='Main'
      component={MainScreen}
      options={{
        tabBarIcon: ({ color, size }) => <AntDesign name='home' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name='Details'
      component={DetailsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='account-details' color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
