import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";

import HomePage from "../screens/HomePage";
import DetailsScreen from "../screens/DetailsScreen";
import FavouritePage from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type RootStackParamList = {
  HomePage: undefined;
  DetailsScreen: { mealId: string };
  FavouritePage: undefined;
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      {/* The DetailsScreen is now part of the top-level stack */}
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      
    </Stack.Navigator>
  );
}

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home-outline";

          if (route.name === "Home") iconName = "home-outline";
          if (route.name === "Favourites") iconName = "heart-outline";
          if (route.name === "ProfileScreen") iconName = "person-circle-outline";

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favourites" component={FavouritePage} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
