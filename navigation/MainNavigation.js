/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DrawerContentScrollView, createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// [IMPORT] =========== CLIENT SCREENS

import HomeView from '../screens/Home';
import ClientsRegisterView from '../screens/ClientsRegister';
import ClientsListingView from '../screens/ClientsListing';
import TicketsRegisterView from '../screens/TicketRegister';
import TicketsListingView from '../screens/TicketListing';
import ChecklistNextFlightsView from '../screens/ChecklistNextFlights';
import InfoExportationView from '../screens/InfoExportation';
import ClientDetails from '../screens/ClientDetails';
import { useAuth } from '../contexts/AuthContext';
import RefundsRegisterView from '../screens/RefundsRegister';
import RefundsListingView from '../screens/RefundsListing';
import PendingQuotesRegisterView from '../screens/PendingQuotesRegister';
import PendingQuotesListingView from '../screens/PendingQuotesListing';
import PendingQuotesDetails from '../screens/PendingQuotesDetails';
import OffersSearchView from '../screens/OffersSearch';
import FlightOffersResultsListing from '../components/FlightOffersResultsListing';

// =================================================== MAIN STACK GROUP

const MainStackGroup = createNativeStackNavigator();

function BaseStackGroup() {
  return (
    <MainStackGroup.Navigator>
      <MainStackGroup.Screen
        name="HomeView"
        component={HomeView}
        options={{ headerShown: false }}
      />
    </MainStackGroup.Navigator>
  );
}

// =================================================== MAIN STACK GROUP

// =================================================== TOP TABS

const TopTabs = createMaterialTopTabNavigator();

// ---------- CLIENTS

function ClientsTopTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: '#ef7946',
        },
      }}
    >
      <TopTabs.Screen
        name="ClientsRegister"
        component={ClientsRegisterView}
        options={{
          tabBarLabel: 'Cadastro de Vendas',
        }}
      />
      <TopTabs.Screen
        name="ClientsListing"
        component={ClientsListingView}
        options={{
          tabBarLabel: 'Listagem de Vendas',
        }}
      />
    </TopTabs.Navigator>
  );
}

// ---------- TICKETS

function TicketsTopTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: '#ef7946',
        },
      }}
    >
      <TopTabs.Screen
        name="TicketsRegister"
        component={TicketsRegisterView}
        options={{
          tabBarLabel: 'Detalhes de Bilhetes',
        }}
      />
      <TopTabs.Screen
        name="TicketsListing"
        component={TicketsListingView}
        options={{
          tabBarLabel: 'Bilhetes Consultados',
        }}
      />
    </TopTabs.Navigator>
  );
}

// ---------- REFUNDS

function RefundsTopTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: '#ef7946',
        },
      }}
    >
      <TopTabs.Screen
        name="RefundRegister"
        component={RefundsRegisterView}
        options={{
          tabBarLabel: 'Cadastro de Reembolso',
        }}
      />
      <TopTabs.Screen
        name="RefundListing"
        component={RefundsListingView}
        options={{
          tabBarLabel: 'Listagem de Reembolsos',
        }}
      />
    </TopTabs.Navigator>
  );
}

// ---------- PENDING QUOTES

function PendingQuotes() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: '#ef7946',
        },
      }}
    >
      <TopTabs.Screen
        name="PendingQuotesRegister"
        component={PendingQuotesRegisterView}
        options={{
          tabBarLabel: 'Cadastro de Cotações',
        }}
      />
      <TopTabs.Screen
        name="PendingQuotesListing"
        component={PendingQuotesListingView}
        options={{
          tabBarLabel: 'Listagem de Cotações',
        }}
      />
    </TopTabs.Navigator>
  );
}

// =================================================== DRAWER | SIDE MENU

const Drawer = createDrawerNavigator();

function LogoutButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        marginLeft: 20,
      }}
    >
      <AntDesign name="logout" size={24} color="black" />
      <Text style={{ marginLeft: 12, fontWeight: '600' }}>Sair</Text>
    </TouchableOpacity>
  );
}

function DrawerClient() {
  const { logoutUser } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <LogoutButton
            onPress={() => {
              logoutUser();
              props.navigation.closeDrawer();
            }}
          />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        drawerActiveTintColor: '#ef7946',
        drawerActiveBackgroundColor: 'rgba(239, 121, 70, 0.3)'

      }}
    >
      <Drawer.Screen
        name="Home"
        component={BaseStackGroup}
        options={({ navigation }) => ({
          title: 'Home',
        })}
      />
      <Drawer.Screen
        name="OffersSearch"
        component={OffersSearchView}
        options={({ navigation }) => ({
          title: 'Buscar Voos'
        })}
      />
      <Drawer.Screen
        name="ClientsRegister"
        component={ClientsTopTabs}
        options={({ navigation }) => ({
          title: 'Vendas'
        })}
      />
      <Drawer.Screen
        name="TicketsRegister"
        component={TicketsTopTabs}
        options={({ navigation }) => ({
          title: 'Bilhetes'
        })}
      />
      <Drawer.Screen
        name="Refund"
        component={RefundsTopTabs}
        options={({ navigation }) => ({
          title: 'Reembolsos'
        })}
      />
      <Drawer.Screen
        name="PendingQuotes"
        component={PendingQuotes}
        options={({ navigation }) => ({
          title: 'Cotações'
        })}
      />
      <Drawer.Screen
        name="InfoExportation"
        component={InfoExportationView}
        options={({ navigation }) => ({
          title: 'Exportar Informações'
        })}
      />
    </Drawer.Navigator>
  );
}

function BackButton({ navigation }) {
  return (
    <TouchableOpacity
      style={{ marginLeft: 10 }}
      onPress={() => navigation && navigation.goBack()}
    >
      <Ionicons name="arrow-back-outline" size={26} color="black" />
    </TouchableOpacity>
  );
}

// =================================================== CLIENT NAVIGATORS

export function MainNavigation() {
  const theme = useColorScheme();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <DrawerClient />
    </NavigationContainer>
  );
}
