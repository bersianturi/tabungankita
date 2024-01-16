import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Back, TransInLarge, TransOutLarge } from "../../assets";
import { TextInput } from "react-native-gesture-handler";
import { supabase } from "../../config/supabaseClient";
import { BlurView } from "expo-blur";

const DetailTransaksi = ({ route, navigation }) => {
  const [isFetched, setIsFetched] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { transactionId } = route.params;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data: transactionsData, error: transactionsError } =
        await supabase
          .from("transaksi")
          .select()
          .eq("id", transactionId)
          .single();

      if (transactionsError) {
        throw transactionsError;
      }

      setTransactions(transactionsData || []);
      setIsFetched(true);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  const formatShortDate = (date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  };

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`;
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      // If the date is today
      return `Hari ini, ${formatTime(date)}`;
    } else {
      // If the date is not today
      return `${formatShortDate(date)}, ${formatTime(date)}`;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const deleteHandler = async () => {
    try {
      const { error } = await supabase
        .from("transaksi")
        .delete()
        .eq("id", transactionId);

      if (error) {
        console.error("Error deleting transaction:", error.message);
      } else {
        navigation.navigate("MainApp");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 70, backgroundColor: "#1e1e1e" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView
          intensity={2}
          tint="dark"
          // blurReductionFactor={4}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 300,
              height: 155,
              backgroundColor: "rgb(50, 50, 50)",
              borderRadius: 15,
            }}
          >
            <View style={{ flex: 1, paddingVertical: 18 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontFamily: "SF-Pro-Semibold",
                  textAlign: "center",
                  marginVertical: -8,
                  marginBottom: 3,
                }}
              >
                Anda yakin akan menghapus transaksi ini?
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "SF-Pro-Regular",
                  textAlign: "center",
                  marginVertical: -8,
                }}
              >
                Anda tidak bisa mengurungkan tindakan ini
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={{
                  flex: 1,
                  borderColor: "white",
                  borderTopWidth: 0.5,
                }}
                onPress={() => setModalVisible(false)}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#3B82F6",
                      fontSize: 16,
                      fontFamily: "SF-Pro-Semibold",
                    }}
                  >
                    Batal
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  flex: 1,
                  borderColor: "white",
                  borderTopWidth: 0.5,
                  borderLeftWidth: 0.5,
                }}
                onPress={deleteHandler}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#C53C3C",
                      fontSize: 16,
                      fontFamily: "SF-Pro-Semibold",
                    }}
                  >
                    Hapus
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </Modal>
      <View style={{ marginLeft: 15 }}>
        <Pressable onPress={() => navigation.navigate("MainApp")}>
          <Image source={Back} />
        </Pressable>
      </View>
      {isFetched ? (
        <View
          style={{ flex: 8, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={transactions.tipe == "Masuk" ? TransInLarge : TransOutLarge}
            style={{ marginBottom: 15, width: 64, height: 64 }}
          />
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Semibold",
              fontSize: 24,
            }}
          >
            {transactions.catatan}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Bold",
              fontSize: 38,
              marginVertical: -20,
            }}
          >
            {formatCurrency(transactions.nominal)}
          </Text>
          <Text
            style={{
              color: "rgba(100,100,100,0.8)",
              fontFamily: "SF-Pro-Bold",
              fontSize: 16,
              marginTop: 5,
            }}
          >
            {formatCreatedAt(transactions.created_at)}
          </Text>
          <View style={{ marginTop: 15 }}>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  color: "#C53C3C",
                  fontFamily: "SF-Pro-Bold",
                  fontSize: 18,
                }}
              >
                Hapus
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

export default DetailTransaksi;

const styles = StyleSheet.create({});
