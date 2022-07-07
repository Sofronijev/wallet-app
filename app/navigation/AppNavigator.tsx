import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "screens/MainScreen";
import DetailsScreen from "screens/DetailsScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "constants/colors";
import HeaderIcon from "components/HeaderIcon";
import { useAppDispatch } from "store/hooks";
import { clearUserData } from "store/reducers/userSlice";
import authStorage from "modules/authStorage";

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const logout = async () => {
    dispatch(clearUserData());
    await authStorage.removeToken();
  };
  return (
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
          tabBarIcon: ({ color, size }) => <FontAwesome5 name='home' color={color} size={size} />,
          headerLeft: () => (
            <HeaderIcon onPress={logout}>
              <FontAwesome5 name='power-off' size={24} color={colors.white} />
            </HeaderIcon>
          ),
        }}
      />
      <Tab.Screen
        name='Details'
        component={DetailsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='clipboard-list' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
