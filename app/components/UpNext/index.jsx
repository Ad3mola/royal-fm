import React, { Component, useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { UpNextComponent } from "../UpNextComponent";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: 93,
    height: 93,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
const { width, height } = Dimensions.get("window");
export const UpNext = ({ channel, nextUp, setModalVisible }) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          paddingTop: 110,
          marginBottom: 320,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "#505050",
            fontWeight: "bold",
            fontSize: 18,
            paddingBottom: 20,
          }}
        >
          Up Next
        </Text>
        <UpNextComponent
          channel={channel}
          upNext={nextUp}
          setModalVisible={setModalVisible}
        />
        {channel?.name?.includes("ilorin") ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              alignSelf: "center",
              shadowColor:
                "0px 5.47988px 6.39319px -0.913313px rgba(0, 0, 0, 0.1)",
              elevation: 2,
              borderRadius: 40,
              marginTop: 30,
              height: 50,
              paddingRight: 30,
              backgroundColor: "white",
              marginBottom: 100,
            }}
            onPress={() => navigation.navigate("Details")}
          >
            <Image
              source={require("../../../assets/schedule.png")}
              resizeMode="cover"
              style={{ height: "100%", marginTop: 8 }}
            />
            <Text
              style={{ color: "#383838", fontSize: 16, fontWeight: "bold" }}
            >
              Check Schedule
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ marginBottom: 100 }}></View>
        )}
      </View>
    </>
  );
};
