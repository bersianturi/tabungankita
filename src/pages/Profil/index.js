import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { profilthumb, ber, ina } from "../../assets";

const Profil = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        paddingHorizontal: 32,
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 30 }}>
        <View style={{ flex: 3, marginTop: 70 }}>
          <Text style={{ color: "white", fontFamily: "SF-Pro-Medium" }}>
            Senin, 1 Januari 2023
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              marginTop: -10,
              fontFamily: "SF-Pro-Bold",
            }}
          >
            Profil
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 70,
          }}
        >
          <Image
            source={profilthumb}
            style={{ width: 60, height: 60, borderRadius: 99 }}
          />
        </View>
      </View>
      <View>
        <View
          style={{
            backgroundColor: "#323232",
            flexDirection: "row",
            padding: 20,
            borderRadius: 15,
            marginBottom: 30,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontFamily: "SF-Pro-Semibold",
                marginTop: -5,
              }}
            >
              Bernard Andrean Sianturi
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "SF-Pro-Regular",
                marginVertical: -5,
              }}
            >
              bernard.req@gmail.com
            </Text>
            <Text style={{ color: "white", fontFamily: "SF-Pro-Regular" }}>
              0896-5500-9891
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={ber}
              style={{ width: 80, height: 80, borderRadius: 99 }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#323232",
            flexDirection: "row",
            padding: 20,
            borderRadius: 15,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontFamily: "SF-Pro-Semibold",
                marginTop: -5,
              }}
            >
              Nur Amalina
            </Text>
            <Text
              style={{
                color: "white",
                fontFamily: "SF-Pro-Regular",
                marginVertical: -5,
              }}
            >
              amalinanur633@gmail.com
            </Text>
            <Text style={{ color: "white", fontFamily: "SF-Pro-Regular" }}>
              0815-3607-4810
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={ina}
              style={{ width: 80, height: 80, borderRadius: 99 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({});
