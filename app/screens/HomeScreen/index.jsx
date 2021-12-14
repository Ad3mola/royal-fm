import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CarouselExample, { MyCarousel } from "../../components/Carousel";
import { UpNext } from "../../components/UpNext";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({
  navigation,
  channel,
  setChannel,
  playSound,
  on,
  upnext,
  createTwoButtonAlert,
  isPlaying,
  playAfterPause,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View
        style={{
          backgroundColor: "#FFFCEA",
          width: "100%",
          height: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>
      <ScrollView>
        <View
          style={{
            ...styles.carouselContainer,
            backgroundColor: channel.bgColor,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: 15,
            }}
          >
            Channels
          </Text>
          <View>
            <MyCarousel setChannel={setChannel} playSound={playSound} />
          </View>
          <View
            style={{
              height: 230,
              width: 240,
              overflow: "hidden",
              shadowColor:
                "0px 5.47988px 6.39319px -0.913313px rgba(0, 0, 0, 0.1)",
              elevation: 2,
              backgroundColor: "white",
              borderRadius: 10,
              position: "absolute",
              top: 200,
              left: width / 6,
              zIndex: 1050,
            }}
          >
            <TouchableOpacity
              style={{ flex: 1, height: "100%" }}
              onPress={() => playSound(channel.url)}
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
                source={require("../../../assets/play.png")}
              >
                <View>
                  <Image
                    source={isPlaying ? channel.pauseIcon : channel.playIcon}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 10, paddingVertical: 7 }}>
              <Text
                numberOfLines={1}
                style={{ color: "#313131", fontWeight: "bold", fontSize: 18 }}
              >
                {on[0]?.name}
              </Text>
              <Text style={{ color: channel.bgColor, fontSize: 12 }}>
                {on[0]?.host ? on[0]?.host : "Royal FM"}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            position: "relative",
            backgroundColor: "#E5E5E5",
            zIndex: -1,
          }}
        >
          <UpNext
            channel={channel}
            nextUp={upnext}
            setModalVisible={createTwoButtonAlert}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
    height: "80%",
  },
  carouselContainer: {
    height: "40%",

    width: "100%",
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    // backgroundColor: "#2196F3",
    borderTopWidth: 1,
  },
  textStyle: {
    color: "red",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomeScreen;
