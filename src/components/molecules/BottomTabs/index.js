import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const Icon = ({ label, focus }) => {
  switch (label) {
    case "Home":
      return focus ? (
        <MaterialIcons name="home" size={23} color="white" />
      ) : (
        <MaterialCommunityIcons name="home-outline" size={23} color="#999999" />
      );
    case "Transaksi":
      return focus ? (
        <Ionicons name="receipt" size={23} color="white" />
      ) : (
        <Ionicons name="receipt-outline" size={23} color="#999999" />
      );
    case "Profil":
      return focus ? (
        <FontAwesome5 name="user-alt" size={23} color="white" />
      ) : (
        <FontAwesome5 name="user" size={23} color="#999999" />
      );
  }
};

const BottomTabs = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#323232",
        // paddingHorizontal: 32,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Icon label={label} focus={isFocused} />
            <Text
              style={{
                color: isFocused ? "#fff" : "#999999",
                fontFamily: isFocused ? "SF-Pro-Semibold" : "SF-Pro-Regular",
                marginVertical: -2,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
