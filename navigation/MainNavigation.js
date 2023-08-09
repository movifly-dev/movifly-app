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

// [IMPORT] =========== CLIENT SCREENS

import HomeView from '../screens/Home';
import ClientsRegisterView from '../screens/ClientsRegister';
import ClientsListingView from '../screens/ClientsListing';
import TicketsRegisterView from '../screens/TicketRegister';
import TicketsListingView from '../screens/TicketListing';
import ChecklistNextFlightsView from '../screens/ChecklistNextFlights';
import ProfitCalculatorView from '../screens/ProfitCalculator';
import InfoExportationView from '../screens/InfoExportation';
import ClientDetails from '../screens/ClientDetails';
import { useAuth } from '../contexts/AuthContext';

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
          title: 'Detalhes do cliente',
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
      {/* <MainStackGroup.Screen
        name="EditForm"
        component={ClientDetailsEdit}
      /> */}
      {/* <MainStackGroup.Screen
        name="Panic"
        component={ClientPanicView}
        options={{ title: "Botão de Pânico" }}
      />
      <MainStackGroup.Screen
        name="Support"
        component={ClientSupportView}
        options={{ title: "Suporte" }}
      /> */}
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
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ClientsTab') {
            iconName = focused ? 'ios-people' : 'people-outline';
          } else if (route.name === 'TicketsTab') {
            iconName = focused ? 'barcode' : 'barcode-outline';
          } else if (route.name === 'ToolsTab') {
            iconName = focused ? 'ios-settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1DA1F2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeView}
        options={{
          title: 'Início',
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
      <Tab.Screen
        name="ClientsTab"
        component={ClientsTopTabs}
        options={{
          title: 'Clientes',
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
        name="ToolsTab"
        component={ToolsTopTabs}
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
          backgroundColor: '#1DA1F2',
        },
      }}
    >
      <TopTabs.Screen
        name="ClientsRegister"
        component={ClientsRegisterView}
        options={{
          tabBarLabel: 'Cadastro de Clientes',
        }}
      />
      <TopTabs.Screen
        name="ClientsListing"
        component={ClientsListingView}
        options={{
          tabBarLabel: 'Listagem de Clientes',
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
          backgroundColor: '#1DA1F2',
        },
      }}
    >
      <TopTabs.Screen
        name="TicketsRegister"
        component={TicketsRegisterView}
        options={{
          tabBarLabel: 'Registros de Bilhetes',
        }}
      />
      <TopTabs.Screen
        name="TicketsListing"
        component={TicketsListingView}
        options={{
          tabBarLabel: 'Listagem de Bilhetes',
        }}
      />
    </TopTabs.Navigator>
  );
}

// ---------- TOOLS

function ToolsTopTabs() {
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
          backgroundColor: '#1DA1F2',
        },
      }}
    >
      <TopTabs.Screen
        name="ProfitCalculator"
        component={ProfitCalculatorView}
        options={{
          tabBarLabel: 'Calculadora de Lucro',
        }}
      />
      <TopTabs.Screen
        name="InfoExportation"
        component={InfoExportationView}
        options={{
          tabBarLabel: 'Exportar Informação',
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
          {/* Your existing drawer items */}
          <DrawerItemList {...props} />
          <LogoutButton
            onPress={() => {
              logoutUser();
              props.navigation.closeDrawer();
            }}
          />
        </DrawerContentScrollView>
      )}>
      <Drawer.Screen
        name="Home"
        component={BaseStackGroup}
        options={({ navigation }) => ({
          title: 'Home',
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name="ClientsRegister"
        component={ClientsRegisterView}
        options={({ navigation }) => ({
          title: 'Cadastro de Clientes',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="ClientsListing"
        component={ClientsListingView}
        options={({ navigation }) => ({
          title: 'Listagem de Clientes',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="TicketsRegister"
        component={TicketsRegisterView}
        options={({ navigation }) => ({
          title: 'Registros de Bilhetes',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="TicketsListing"
        component={TicketsListingView}
        options={({ navigation }) => ({
          title: 'Listagem de Bilhetes',
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
        name="ProfitCalculator"
        component={ProfitCalculatorView}
        options={({ navigation }) => ({
          title: 'Calculadora de Lucro',
          headerLeft: () => <BackButton navigation={navigation} />,
        })}
      />
      <Drawer.Screen
        name="InfoExportation"
        component={InfoExportationView}
        options={({ navigation }) => ({
          title: 'Exportar Informação',
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
      {/* <ClientStackGroup /> */}
      <DrawerClient />
    </NavigationContainer>
  );
}

// headerLeft: () => (
//   <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
//     <Image
//       source={require('../assets/icons/left.png')}
//       style={{ width: 20, height: 20 }}
//     />
//   </TouchableOpacity>
// ),
