import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import Router from "./src/router";
import * as Font from "expo-font";
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(30,30, 30)",
  },
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "SF-Pro-Regular": require("./src/assets/fonts/SF-Pro-Display-Regular.otf"),
          "SF-Pro-Medium": require("./src/assets/fonts/SF-Pro-Display-Medium.otf"),
          "SF-Pro-Semibold": require("./src/assets/fonts/SF-Pro-Display-Semibold.otf"),
          "SF-Pro-Bold": require("./src/assets/fonts/SF-Pro-Display-Bold.otf"),
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#1e1e1e" }}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer theme={MyTheme}>
        <StatusBar style="light" />
        <Router />
      </NavigationContainer>
    </View>
  );
}
