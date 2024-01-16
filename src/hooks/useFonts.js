import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    sfpro: require("../assets/fonts/SF-Pro.ttf"),
    inter: require("../assets/fonts/Inter.ttf"),
  });
