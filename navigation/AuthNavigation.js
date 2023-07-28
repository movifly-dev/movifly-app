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

// =================================================== AUTH NAVIGATORS

const AuthStack = createNativeStackNavigator();

export function AuthNavigation() {
  const theme = useColorScheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginView} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
