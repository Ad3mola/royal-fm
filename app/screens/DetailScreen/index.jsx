import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Programs from "../../components/Programs";

const DetailScreen = ({
  navigation,
  channel,
  live,
  schedule,
  day,
  createTwoButtonAlert,
}) => {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          width: "90%",
          borderRadius: 20,
          alignItems: "center",
          backgroundColor: "white",
          height: 70,
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#A2A2A2", fontSize: 10, marginRight: 10 }}>
            {item.time}
          </Text>
          <Image
            style={{ height: 40, width: 40, borderRadius: 10, marginRight: 10 }}
            source={{
              uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/play_qvekzh.png",
            }}
          />
          <View>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text style={{ color: "#A2A2A2", fontSize: 10 }}>
              {item?.host ? item?.host : "Royal FM"}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => createTwoButtonAlert(item)}>
          <Image
            source={{ uri: channel.option }}
            style={{ width: 5, height: 20 }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  console.log(day);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView style={{ flex: 1 }}> */}
      <View
        style={{
          height: "30%",
          backgroundColor: "white",
          borderBottomLeftRadius: 27,
          borderBottomRightRadius: 27,
        }}
      >
        <View
          style={{
            height: "60%",
            backgroundColor: channel.bgColor,
            // paddingTop: 20,
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomLeftRadius: 59,
            borderBottomRightRadius: 59,
            flexDirection: "row",
            paddingHorizontal: 30,
          }}
        >
          <TouchableNativeFeedback onPress={() => navigation.navigate("Home")}>
            <Image
              style={{ width: 15, height: 15 }}
              source={{
                uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/goBack_temp3a.png",
              }}
            />
          </TouchableNativeFeedback>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Schedule
          </Text>
          <Text></Text>
        </View>
        <View
          style={{
            height: "40%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <View></View>
            <Text
              style={{
                color: day.includes("sunday") ? channel.bgColor : "#C4C4C4",
                fontSize: 16,
                fontWeight: day.includes("sunday") ? "bold" : "normal",
              }}
            >
              Sun
            </Text>
          </View>
          <View>
            <View></View>
            <Text
              style={{
                color: day.includes("monday") ? channel.bgColor : "#C4C4C4",
                fontSize: 16,
                fontWeight: day.includes("monday") ? "bold" : "normal",
              }}
            >
              Mon
            </Text>
          </View>
          <View>
            <View></View>
            <Text
              style={{
                color: day.includes("tuesday") ? channel.bgColor : "#C4C4C4",
                fontSize: 16,
                fontWeight: day.includes("tuesday") ? "bold" : "normal",
              }}
            >
              Tue
            </Text>
          </View>
          <View>
            <View></View>
            <Text
              style={{
                color: day.includes("wednesday") ? channel.bgColor : "#C4C4C4",
                fontSize: 16,
                fontWeight: day.includes("wednesday") ? "bold" : "normal",
              }}
            >
              Wed
            </Text>
          </View>
          <View>
            <View></View>
            <Text
              style={{
                color: day.includes("thursday") ? channel.bgColor : "#C4C4C4",
                fontSize: 16,
                fontWeight: day.includes("thursday") ? "bold" : "normal",
              }}
            >
              Thu
            </Text>
          </View>
          <View>
            <View></View>
            <Text
              style={{
                color: day.includes("friday") ? channel.bgColor : "#C4C4C4",
                fontSize: 16,
                fontWeight: day.includes("friday") ? "bold" : "normal",
              }}
            >
              Fri
            </Text>
          </View>
          <View>
            <View></View>
            <Text
              style={{
                color: day.includes("saturday") ? channel.bgColor : "#C4C4C4",
                fontSize: 16,
                fontWeight: day.includes("saturday") ? "bold" : "normal",
              }}
            >
              Sat
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <Text style={{ color: "#FF4545", fontWeight: "bold" }}>Live</Text>
          <Image
            style={{ width: 20, height: 20 }}
            source={{
              uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515728/live_pvoqdu.png",
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Programs
            item={live[0]}
            channel={channel}
            createTwoButtonAlert={createTwoButtonAlert}
          />
        </View>
        <View style={{ flex: 1, paddingBottom: 30 }}>
          <Text
            style={{
              fontWeight: "bold",
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 10,
            }}
          >
            Later Today
          </Text>
          <FlatList
            data={schedule}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DetailScreen;
