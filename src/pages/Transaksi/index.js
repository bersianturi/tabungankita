import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Right, TransInLarge, TransOutLarge, profilthumb } from "../../assets";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native-gesture-handler";
import { supabase } from "../../config/supabaseClient";
import Modal from "react-native-modalbox";

const Transaksi = ({ navigation }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAllTransactions();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  const showStartDatePicker = () => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: onChangeStartDate,
      mode: "date",
      is24Hour: true,
    });
  };

  const showEndDatePicker = () => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: onChangeEndDate,
      mode: "date",
      is24Hour: true,
      timeZoneName: "Jakarta/Asia",
      minimumDate: startDate,
    });
  };

  function formatDate(inputDate) {
    const months = [
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

    const day = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    const formattedDate = `${day} ${month}, ${year}`;

    return formattedDate;
  }

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const resetHandler = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setTransactions([]);
    setIsFetched(true);
  };

  const fetchAllTransactions = async () => {
    setIsFetched(false);
    try {
      const { data: transactionsData, error: transactionsError } =
        await supabase
          .from("transaksi")
          .select()
          .order("created_at", { ascending: false });

      if (transactionsError) {
        throw transactionsError;
      }

      setTransactions(transactionsData || []);
      setIsFetched(true);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  const fetchTransactions = async (startDate, endDate) => {
    try {
      const { data, error } = await supabase
        .from("transaksi")
        .select()
        .gte("created_at", startDate)
        .lte("created_at", endDate);

      if (error) {
        console.error("Error fetching data:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }
  };

  const handleFetchTransactions = async () => {
    try {
      setIsFetched(false);
      const transactionsData = await fetchTransactions(
        startDate.toISOString().substring(0, 10) + " 00:00:00",
        endDate.toISOString().substring(0, 10) + " 23:59:59"
      );
      setTransactions(transactionsData);
      setIsFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
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
              fontFamily: "SF-Pro-Bold",
              marginTop: -10,
            }}
          >
            Transaksi
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
          <Pressable onPress={() => navigation.navigate("Profil")}>
            <Image
              source={profilthumb}
              style={{ width: 60, height: 60, borderRadius: 99 }}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
      >
        <Pressable
          style={{
            flex: 3,
            backgroundColor: "#323232",
            paddingVertical: 15,
            paddingHorizontal: 25,
            borderRadius: 15,
          }}
          onPress={showStartDatePicker}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              fontFamily: "SF-Pro-Semibold",
              marginVertical: -5,
            }}
          >
            {formattedStartDate || ""}
          </Text>
        </Pressable>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={Right} />
        </View>
        <Pressable
          style={{
            flex: 3,
            backgroundColor: "#323232",
            paddingVertical: 15,
            paddingHorizontal: 25,
            borderRadius: 15,
          }}
          onPress={showEndDatePicker}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              fontFamily: "SF-Pro-Semibold",
              marginVertical: -5,
            }}
          >
            {formattedEndDate || ""}
          </Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 30 }}>
        <Pressable
          style={{
            backgroundColor: "#3B82F6",
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 15,
          }}
          onPress={handleFetchTransactions}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Semibold",
              fontSize: 14,
              marginVertical: -5,
            }}
          >
            Cari
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#C53C3C",
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 15,
          }}
          onPress={resetHandler}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "SF-Pro-Semibold",
              fontSize: 14,
              marginVertical: -5,
            }}
          >
            Reset
          </Text>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 25, marginBottom: 50 }}>
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
                  <View>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("DetailTransaksi", {
                          transactionId: transaction.id,
                        })
                      }
                    >
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
                    </Pressable>
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
      </ScrollView>
    </View>
  );
};

export default Transaksi;

const styles = StyleSheet.create({});
