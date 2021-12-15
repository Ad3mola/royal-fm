import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import AppIntroSlider from "react-native-app-intro-slider";

// const slides = [
//   {
//     key: "one",
//     image: require("../../../assets/onboarding1.png"),
//     title: "Listen Live",
//     text: "Never miss a show, listen to our channel anywhere, anytime",
//     backgroundColor:
//       "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF",
//   },
//   {
//     key: "two",
//     image: require("../../../assets/onboarding2.png"),
//     title: "Schedule Shows",
//     text: "Set reminders for your shows, and get notified",
//     backgroundColor:
//       "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF",
//   },
//   {
//     key: "three",
//     image: require("../../../assets/onboarding3.png"),
//     title: "Switch Frequencies",
//     text: "Switch between our stations",
//     backgroundColor:
//       "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF",
//   },
// ];

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "#891C2E" : "transparent";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        marginHorizontal: 3,
        borderColor: "#000000",
        borderWidth: "0.5em",
        backgroundColor,
      }}
    />
  );
};

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      bottomBarHighlight={false}
      titleStyles={{ color: "#891C2E", fontWeight: "800" }}
      subTitleStyles={{ color: "#3E3E3E" }}
      DotComponent={Square}
      onSkip={() => navigation.replace("Home")}
      onDone={() => navigation.navigate("Home")}
      pages={[
        {
          backgroundColor:
            "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF;",
          image: (
            <Image
              style={{ width: 400, height: 400 }}
              source={{
                uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/onboarding1_clgsi3.png",
              }}
            />
          ),
          title: "Listen Live",
          subtitle:
            "Never miss a show, listen to our channel anywhere, anytime",
        },
        {
          backgroundColor:
            "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF;",
          image: (
            <Image
              style={{ width: 400, height: 400 }}
              source={{
                uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/onboarding2_i0idle.png",
              }}
            />
          ),
          title: "Schedule Shows",
          subtitle: "Set reminders for your shows, and get notified",
        },
        {
          backgroundColor:
            "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF;",
          image: (
            <Image
              style={{ width: 400, height: 400 }}
              source={{
                uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/onboarding3_or17xm.png",
              }}
            />
          ),
          title: "Switch Frequencies",
          subtitle: "Switch between our stations ",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 54,
    width: "80%",
    marginTop: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2EE59D",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: "rgba(46, 229, 157, 0.5)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: "#fdfdfd",
    fontWeight: "700",
  },
});

export default OnboardingScreen;
