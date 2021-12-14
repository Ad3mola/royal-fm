import React, { Component, useRef, useState, useEffect } from "react";
import { Text, View, Dimensions, StyleSheet, Image } from "react-native";

import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");

const images = [
  {
    image: require("../../../assets/kaduna.png"),
    color: "#CCE7D4",
    bgColor: "#14804B",
    name: "kaduna",
    option: require("../../../assets/kaduna-options.png"),
    stop: require("../../../assets/stop.png"),
    play: require("../../../assets/playIcon.png"),
    playIcon: require("../../../assets/kaduna-play.png"),
    pauseIcon: require("../../../assets/kaduna-pause.png"),
    url: "http://197.210.168.147:8001/stream1",
    stream: require("../../../assets/kaduna-stream.png"),
  },
  {
    image: require("../../../assets/ilorin.png"),
    bgColor: "#891C2E",
    name: "ilorin",
    color: "#DBC296",
    option: require("../../../assets/options.png"),
    stop: require("../../../assets/red-stop.png"),
    play: require("../../../assets/red-play.png"),
    playIcon: require("../../../assets/ilorin-play.png"),
    pauseIcon: require("../../../assets/ilorin-pause.png"),
    url: "http://197.210.168.147:8000/stream",
    stream: require("../../../assets/red-reader.png"),
  },
  {
    image: require("../../../assets/asaba.png"),
    color: "#BFE7FA",
    bgColor: "#129CD4",
    name: "asaba",
    option: require("../../../assets/asaba-options.png"),
    stop: require("../../../assets/red-stop.png"),
    play: require("../../../assets/red-play.png"),
    playIcon: require("../../../assets/asaba-play.png"),
    pauseIcon: require("../../../assets/asaba-pause.png"),
    url: "http://197.210.168.147:8001/stream1",
    stream: require("../../../assets/asaba-stream.png"),
  },
  {
    image: require("../../../assets/monarchrise-icon.png"),
    color: "#BFE7FA",
    bgColor: "#129CD4",
    name: "monarchrise",
    option: require("../../../assets/asaba-options.png"),
    stop: require("../../../assets/red-stop.png"),
    play: require("../../../assets/red-play.png"),
    playIcon: require("../../../assets/asaba-play.png"),
    pauseIcon: require("../../../assets/asaba-pause.png"),
    url: "http://197.210.168.147:8001/stream1",
    stream: require("../../../assets/asaba-stream.png"),
  },
];

const styles = StyleSheet.create({
  slide: {
    // flex: 1,
    width: 93,
    height: 93,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export const MyCarousel = ({ setChannel, playSound }) => {
  const carousel = useRef();

  const [index, setIndex] = useState(1);

  const getChannel = (index) => {
    setChannel(images[index]);
    playSound(images[index].url);
  };
  useEffect(() => {
    getChannel(index);
  }, [index]);
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          width: 93,
          height: 93,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          backgroundColor: item.color,
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <Image source={item.image} style={{ resizeMode: "contain" }} />
      </View>
    );
  };

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={93}
      layout={"default"}
      sliderHeight={40}
      firstItem={1}
      itemHeight={20}
      inactiveSlideOpacity={1}
      ref={carousel}
      onSnapToItem={() => setIndex(carousel.current._activeItem)}
    />
  );
};
