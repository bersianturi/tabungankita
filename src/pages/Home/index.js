import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Card, TransInLarge, TransOutLarge, profilthumb } from "../../assets";
import { supabase } from "../../config/supabaseClient";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [saldo, setSaldo] = useState();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsFetched(false);

    fetchTransactions();
    fetchSaldo();

    if (isFetched) {
      setRefreshing(false);
    }
  });

  useEffect(() => {
    fetchTransactions();
    fetchSaldo();
  }, []);

  const fetchSaldo = async () => {
    try {
      const { data: saldoData, error: saldoError } = await supabase.rpc(
        "calculate_saldo"
      );

      if (saldoError) {
        throw saldoError;
      }
      setSaldo(saldoData || 0);
    } catch (error) {
      console.error("Error fetching saldo:", error.message);
    }
  };

  const update = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "transaksi",
      },
      (payload) => onRefresh()
    )
    .subscribe();

  const fetchTransactions = async () => {
    try {
      const { data: transactionsData, error: transactionsError } =
        await supabase
          .from("transaksi")
          .select()
          .order("created_at", { ascending: false })
          .range(0, 4);

      if (transactionsError) {
        throw transactionsError;
      }

      setTransactions(transactionsData || []);
      setIsFetched(true);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        paddingHorizontal: 32,
        marginTop: 50,
        fontFamily: "SF-Pro-Regular",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexDirection: "row", marginBottom: 30 }}>
        <View style={{ flex: 3, marginTop: 20 }}>
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Medium",
            }}
          >
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
            Hai, Ber dan Ina!
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Pressable onPress={() => navigation.navigate("Profil")}>
            <Image
              source={profilthumb}
              style={{ width: 60, height: 60, borderRadius: 99 }}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#323232",
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 15,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Medium",
            }}
          >
            Saldo Tabungan
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontFamily: "SF-Pro-Bold",
              marginTop: -10,
              marginBottom: -10,
            }}
          >
            {saldo ? formatCurrency(saldo) : "Rp -"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Image source={Card} />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 20, marginBottom: 30 }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#22C55E",
            paddingHorizontal: 41,
            paddingVertical: 12,
            borderRadius: 15,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Nabung")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "SF-Pro-Semibold",
              marginVertical: -5,
            }}
          >
            Nabung
          </Text>
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#C53C3C",
            paddingHorizontal: 41,
            paddingVertical: 12,
            borderRadius: 15,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Keluar")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "SF-Pro-Semibold",
              marginVertical: -5,
            }}
          >
            Keluar
          </Text>
        </Pressable>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontSize: 28,
                color: "white",
                fontFamily: "SF-Pro-Bold",
                marginVertical: -5,
              }}
            >
              Histori
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Pressable>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 14,
                  color: "#3B82F6",
                  fontFamily: "SF-Pro-Regular",
                }}
                onPress={() => navigation.navigate("Transaksi")}
              >
                Lihat Semua
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ gap: 25 }}>
          {isFetched ? (
            transactions.map((transaction) => (
              <View
                key={transaction.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={
                      transaction.tipe == "Masuk" ? TransInLarge : TransOutLarge
                    }
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 15,
                      marginRight: 10,
                    }}
                  />
                  <Pressable
                    onPress={() =>
                      navigation.navigate("DetailTransaksi", {
                        transactionId: transaction.id,
                      })
                    }
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "white",
                          fontFamily: "SF-Pro-Bold",
                          marginVertical: -5,
                        }}
                      >
                        {transaction.catatan}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "white",
                          fontFamily: "SF-Pro-Regular",
                          marginVertical: -2,
                        }}
                      >
                        {formatCreatedAt(transaction.created_at)}
                      </Text>
                    </View>
                  </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 16,
                      color:
                        transaction.tipe == "Masuk" ? "#22C55E" : "#C53C3C",
                      fontFamily: "SF-Pro-Regular",
                    }}
                  >
                    {formatCurrency(transaction.nominal)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <ActivityIndicator color={"white"} size={"large"} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
