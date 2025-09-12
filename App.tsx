import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./src/screens/register"
import TabNavigator from "./src/navigation/TabNavigation";
import { store, persistor } from "./src/redux/store";
import Login from './src/screens/Login';
import DetailsScreen from "./src/screens/DetailsScreen";
import {FavoritesProvider} from "./src/screens/FavoritesContext";
import { useSelector } from 'react-redux';
import { RootState } from "./src/redux/store";

export type RootStackParamList = {
  Register: undefined;
  MainTabs: undefined;
  Login: undefined;
  DetailsScreen: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

// This component will handle the conditional rendering based on authentication state
const MainNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // If the user is authenticated, show the MainTabs navigator
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen as React.ComponentType<any>} />
        </>
      ) : (
        // If the user is not authenticated, show the login and register screens
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FavoritesProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </PersistGate>
    </Provider>
  );
}
