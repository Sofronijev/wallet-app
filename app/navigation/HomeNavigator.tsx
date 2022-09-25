import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "feature/mainScreen";
import DetailsScreen from "screens/DetailsScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "constants/colors";
import HeaderIcon from "components/HeaderIcon";
import { useAppDispatch } from "store/hooks";
import { clearUserData } from "store/reducers/userSlice";
import authStorage from "modules/authStorage";
import { HomeStackParamList } from "./routes";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    dispatch(clearUserData());
    await authStorage.removeRefreshToken();
  };

  return (
    <Tab.Navigator
      initialRouteName='Balance'
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
        name='Balance'
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="md-wallet-sharp" size={size} color={color} />,
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

export default HomeNavigator;
