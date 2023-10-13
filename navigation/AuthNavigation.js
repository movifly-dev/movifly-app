import * as React from 'react';
import { useColorScheme } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';

// [IMPORT] =========== AUTH SCREENS

import LoginView from '../screens/auth/Login';
import OffersSearchView from '../screens/OffersSearch';
import HomeAuth from '../screens/auth/Home';
import FlightOffersResultsListing from '../components/FlightOffersResultsListing';

// =================================================== AUTH NAVIGATORS

const AuthStack = createNativeStackNavigator();

export function AuthNavigation() {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <AuthStack.Navigator>
        <AuthStack.Screen name="HomeAuthView" component={HomeAuth} options={{ headerShown: false }} />
        <AuthStack.Screen name="Login" component={LoginView} options={{ headerShown: true, title: '' }} />
        <AuthStack.Screen name="OffersSearchView" component={OffersSearchView} options={{ headerShown: true, title: 'Buscar Voos' }} />
        <AuthStack.Screen name="FlightOffersResultsView" component={FlightOffersResultsListing} options={{ headerShown: true, title: 'Resultados da Busca' }} />

      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
