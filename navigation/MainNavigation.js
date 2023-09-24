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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

// =================================================== MAIN STACK GROUP

const MainStackGroup = createNativeStackNavigator();

function BaseStackGroup() {
  return (
    <MainStackGroup.Navigator>
      <MainStackGroup.Screen
        name="TabsGroup"
        component={ClientTabsGroup}
        options={{ headerShown: false }}
      />
      <MainStackGroup.Screen
        name="ClientDetails"
        component={ClientDetails}
        options={({ navigation }) => ({
          title: 'Detalhes da venda',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation && navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={26} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <MainStackGroup.Screen
        name="QuoteDetails"
        component={PendingQuotesDetails}
        options={({ navigation }) => ({
          title: 'Detalhes da cotação',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation && navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={26} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </MainStackGroup.Navigator>
  );
}

// =================================================== MAIN STACK GROUP

const Tab = createBottomTabNavigator();

// ---------- CLIENT

function ClientTabsGroup() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ConfigurationsTab') {
            iconName = focused ? 'ios-settings' : 'settings-outline';
          } else if (route.name === 'ClientsTab') {
            iconName = focused ? 'ios-people' : 'people-outline';
          } else if (route.name === 'TicketsTab') {
            iconName = focused ? 'barcode' : 'barcode-outline';
          } else if (route.name === 'Refund') {
            iconName = 'cash-refund';
          } else if (route.name === 'PendingQuotes') {
            iconName = 'md-cash-outline';
          }

          const iconComponent = route.name === 'Refund' ?
            <MaterialCommunityIcons name={iconName} size={size} color={color} /> :
            <Ionicons name={iconName} size={size} color={color} />;

          return iconComponent;
        },
        tabBarActiveTintColor: '#ef7946',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="ClientsTab"
        component={ClientsTopTabs}
        options={{
          title: 'Vendas',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="md-menu" size={26} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="TicketsTab"
        component={TicketsTopTabs}
        options={{
          title: 'Bilhetes',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="md-menu" size={26} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Refund"
        component={RefundsTopTabs}
        options={{
          title: 'Reembolsos',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="md-menu" size={26} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="PendingQuotes"
        component={PendingQuotes}
        options={{
          title: 'Cotações',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="md-menu" size={26} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="ConfigurationsTab"
        component={InfoExportationView}
        options={{
          title: 'Ferramentas',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="md-menu" size={26} color="black" />
            </TouchableOpacity>
          ),
        }}
        screenOptions={{}}
      />
    </Tab.Navigator>
  );
}

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
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name="OffersSearch"
        component={OffersSearchView}
        options={({ navigation }) => ({
          title: 'Buscar Voos',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="ClientsRegister"
        component={ClientsRegisterView}
        options={({ navigation }) => ({
          title: 'Cadastro de Vendas',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="ClientsListing"
        component={ClientsListingView}
        options={({ navigation }) => ({
          title: 'Listagem de Vendas',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="TicketsRegister"
        component={TicketsRegisterView}
        options={({ navigation }) => ({
          title: 'Detalhes de Bilhetes',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="TicketsListing"
        component={TicketsListingView}
        options={({ navigation }) => ({
          title: 'Bilhetes consultados',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="ChecklistNextFlights"
        component={ChecklistNextFlightsView}
        options={({ navigation }) => ({
          title: 'Voos Próximos',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="RefundRegister"
        component={RefundsRegisterView}
        options={({ navigation }) => ({
          title: 'Cadastro de Reembolso',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="RefundListing"
        component={RefundsListingView}
        options={({ navigation }) => ({
          title: 'Listagem de Reembolsos',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="PendingQuotesRegister"
        component={PendingQuotesRegisterView}
        options={({ navigation }) => ({
          title: 'Cadastro de Cotações',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="PendingQuotesListing"
        component={PendingQuotesListingView}
        options={({ navigation }) => ({
          title: 'Listagem de Cotações',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="InfoExportation"
        component={InfoExportationView}
        options={({ navigation }) => ({
          title: 'Exportar Informações',
          headerLeft: () => <BackButton navigation={navigation} />,
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
