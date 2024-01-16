import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { splashicon } from "../../assets";
import { TouchableOpacity } from "react-native-web";

const Splashscreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1e1e1e",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
      }}
    >
      <View>
        <Image source={splashicon} />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>
          TabunganKita!
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Setiap tetes keringat yang Anda keluarkan untuk menabung adalah
          investasi dalam kebahagiaan Anda di masa depan.
        </Text>
      </View>
      <Pressable
        style={{
          backgroundColor: "white",
          paddingVertical: 13,
          paddingHorizontal: 30,
          borderRadius: 12,
          marginTop: 35,
        }}
        onPress={() => navigation.navigate("MainApp")}
      >
        <Text style={{ fontWeight: "bold" }}>MASUK</Text>
      </Pressable>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({});
