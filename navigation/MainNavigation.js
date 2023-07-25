import * as React from "react";
import { useColorScheme } from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// [IMPORT] =========== CLIENT SCREENS

import Home from "../screens/Home";
import ClientsRegister from "../screens/ClientsRegister";
import ClientsListing from "../screens/ClientsListing";
import TicketsRegister from "../screens/TicketRegister";
import TicketsListing from "../screens/TicketListing";
import ChecklistNextFlights from "../screens/ChecklistNextFlights";
import ProfitCalculator from "../screens/ProfitCalculator";
import InfoExportation from "../screens/InfoExportation";

// =================================================== MAIN STACK GROUP

const MainStackGroup = createNativeStackNavigator();

// ---------- CLIENT

function ClientStackGroup() {
  return (
    <MainStackGroup.Navigator>
      <MainStackGroup.Screen
        name="TabsGroup"
        component={ClientTabsGroup}
        options={{ headerShown: false }}
      />
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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Travel") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Início" }} />
      <Tab.Screen
        name="Travel"
        component={ClientsTopTabs}
        options={{ title: "Clientes" }}
      />
      <Tab.Screen
        name="Account"
        component={TicketsTopTabs}
        options={{ title: "Bilhetes" }}
      />
    </Tab.Navigator>
  );
}

// =================================================== TOP TABS

const TopTabs = createMaterialTopTabNavigator();

// ---------- TRAVELS

function ClientsTopTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen
        name="ClientsRegister"
        component={ClientsRegister}
        options={{
          tabBarLabel: "Cadastro de Clientes",
        }}
      />
      <TopTabs.Screen
        name="ClientsListing"
        component={ClientsListing}
        options={{
          tabBarLabel: "Listagem de Clientes",
        }}
      />
    </TopTabs.Navigator>
  );
}

// ---------- ACCOUNT

function TicketsTopTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#1DA1F2",
        },
      }}
    >
      <TopTabs.Screen
        name="TicketsRegister"
        component={TicketsRegister}
        options={{
          tabBarLabel: "Registros de Bilhetes",
        }}
      />
      <TopTabs.Screen
        name="TicketsListing"
        component={TicketsListing}
        options={{
          tabBarLabel: "Listagem de Bilhetes",
        }}
      />
    </TopTabs.Navigator>
  );
}

// =================================================== CLIENT NAVIGATORS

export function ClientNavigation() {
  const theme = useColorScheme();
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      {/* <ClientStackGroup /> */}
      <DrawerClient />
    </NavigationContainer>
  );
}

// =================================================== DRAWER | SIDE MENU

const Drawer = createDrawerNavigator();

// // ---------- CLIENT

function DrawerClient() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={ClientStackGroup}
        options={({ navigation }) => ({
          title: "Home",
        })}
      />
      <Drawer.Screen
        name="ClientsRegister"
        component={ClientsRegister}
        options={({ navigation }) => ({
          title: "Cadastro de Clientes",
        })}
      />
      <Drawer.Screen
        name="ClientsListing"
        component={ClientsListing}
        options={({ navigation }) => ({
          title: "Listagem de Clientes",
        })}
      />
      <Drawer.Screen
        name="TicketsRegister"
        component={TicketsRegister}
        options={({ navigation }) => ({
          title: "Registros de Bilhetes",
        })}
      />
      <Drawer.Screen
        name="TicketsListing"
        component={TicketsListing}
        options={({ navigation }) => ({
          title: "Listagem de Bilhetes",
        })}
      />
      <Drawer.Screen
        name="ChecklistNextFlights"
        component={ChecklistNextFlights}
        options={({ navigation }) => ({
          title: "Voos Próximos",
        })}
      />
      <Drawer.Screen
        name="ProfitCalculator"
        component={ProfitCalculator}
        options={({ navigation }) => ({
          title: "Calculadora de Lucro",
        })}
      />
      <Drawer.Screen
        name="InfoExportation"
        component={InfoExportation}
        options={({ navigation }) => ({
          title: "Exportar Informação",
        })}
      />
    </Drawer.Navigator>
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
