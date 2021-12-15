import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Programs = ({ channel, item, createTwoButtonAlert }) => {
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
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#A2A2A2", fontSize: 10, marginRight: 10 }}>
          {item?.time}
        </Text>
        <Image
          style={{ height: 40, width: 40, borderRadius: 10, marginRight: 10 }}
          source={{
            uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/play_qvekzh.png",
          }}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
          <Text style={{ color: "#A2A2A2", fontSize: 10 }}>
            {item?.host ? item?.host : "Royal FM"}
          </Text>
        </View>
      </View>
      <TouchableNativeFeedback onPress={() => createTwoButtonAlert(item)}>
        <Image source={{ uri: channel.option, width: 5, height: 20 }} />
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Programs;
