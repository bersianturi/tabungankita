import { BackHandler, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Back } from "../../assets";
import { TextInput } from "react-native-gesture-handler";
import { supabase } from "../../config/supabaseClient";

const Keluar = ({ navigation }) => {
  const [realNominal, setRealNominal] = useState(0);
  const [displayNominal, setDisplayNominal] = useState("");
  const [catatan, setCatatan] = useState("");

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("MainApp");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const formatCurrency = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    const parsedValue = parseInt(numericValue, 10);
    const isValidNumber = !isNaN(parsedValue) && isFinite(parsedValue);

    // Format the value as currency without decimals
    const formattedValue = isValidNumber
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(parsedValue)
      : "Rp ";

    return formattedValue;
  };

  const handleChangeText = (text) => {
    if (text === "") {
      setRealNominal(0);
      setDisplayNominal("");
    } else {
      const numericValue = parseInt(text.replace(/[^0-9]/g, ""), 10);
      setRealNominal(isNaN(numericValue) ? 0 : numericValue);
      setDisplayNominal(formatCurrency(text));
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (realNominal && catatan) {
      const { error } = await supabase.from("transaksi").insert({
        tipe: "Keluar",
        catatan,
        nominal: realNominal,
      });

      if (error) {
        console.error(error);
      } else {
        console.log("Data di submit");
        navigation.navigate("MainApp");
      }
    } else {
      Alert.alert("Error", "Data tidak boleh kosong.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1e1e1e" }}>
      <View style={{ marginTop: 60, marginLeft: 15 }}>
        <Pressable onPress={() => navigation.navigate("MainApp")}>
          <Image source={Back} />
        </Pressable>
      </View>
      <View style={{ flex: 8, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ color: "rgba(100,100,100,50)", fontFamily: "SF-Pro-Bold" }}
        >
          KELUAR
        </Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Nominal"
          placeholderTextColor={"rgba(100,100,100,0.5)"}
          returnKeyType="done"
          textAlign="center"
          style={{
            color: "white",
            fontSize: 42,
            fontWeight: "bold",
            marginTop: 10,
          }}
          value={displayNominal}
          onChangeText={handleChangeText}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#292929",
          borderTopStartRadius: 35,
          borderTopEndRadius: 35,
          paddingHorizontal: 32,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 4 }}>
          <TextInput
            style={{ color: "white", fontFamily: "SF-Pro-Regular" }}
            placeholder="Tambah catatan"
            placeholderTextColor={"white"}
            value={catatan}
            onChangeText={setCatatan}
          />
        </View>
        <View>
          <Pressable
            style={{
              backgroundColor: "#EF4444",
              paddingHorizontal: 25,
              paddingVertical: 13,
              borderRadius: 15,
            }}
            onPress={handleSave}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: "SF-Pro-Medium",
                marginVertical: -5,
              }}
            >
              Simpan
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Keluar;
