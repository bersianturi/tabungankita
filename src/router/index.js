import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Profil,
  Splashscreen,
  Transaksi,
  Nabung,
  Keluar,
  DetailTransaksi,
  TestModal,
} from "../pages";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabs } from "../components/molecules";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabs {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transaksi" component={Transaksi} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Splashscreen" component={Splashscreen} /> */}
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Nabung" component={Nabung} />
      <Stack.Screen name="Keluar" component={Keluar} />
      <Stack.Screen name="DetailTransaksi" component={DetailTransaksi} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
