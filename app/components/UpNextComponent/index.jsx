import React, { Component, useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

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
export const UpNextComponent = ({ channel, upNext, setModalVisible }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 154,
          width: 154,
          overflow: "hidden",
          shadowColor: "0px 5.47988px 6.39319px -0.913313px rgba(0, 0, 0, 0.1)",
          elevation: 2,
          borderRadius: 10,
          backgroundColor: "white",
          marginRight: 12,
          // marginHorizontal: 10,
        }}
      >
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
          source={{
            uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/play_qvekzh.png",
          }}
        ></ImageBackground>

        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 7,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              numberOfLines={1}
              style={{ color: "#313131", fontWeight: "bold", fontSize: 14 }}
            >
              {upNext[0]?.name}
            </Text>
            <Text style={{ color: "#A2A2A2", fontSize: 10 }}>
              {upNext[0]?.time}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(upNext[0])}>
            <Image source={{ uri: channel.option, width: 5, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: 154,
          width: 154,
          overflow: "hidden",
          shadowColor: "0px 5.47988px 6.39319px -0.913313px rgba(0, 0, 0, 0.1)",
          elevation: 2,
          borderRadius: 10,
          backgroundColor: "white",
          // marginHorizontal: 10,
        }}
      >
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
          source={{
            uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/play_qvekzh.png",
          }}
        ></ImageBackground>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 7,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              numberOfLines={1}
              style={{ color: "#313131", fontWeight: "bold", fontSize: 14 }}
            >
              {upNext[1]?.name}
            </Text>
            <Text style={{ color: "#A2A2A2", fontSize: 10 }}>
              {upNext[1]?.time}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(upNext[0])}>
            <Image source={{ uri: channel.option, width: 5, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
