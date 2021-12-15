import React, { Component, useRef, useState, useEffect } from "react";
import { Text, View, Dimensions, StyleSheet, Image } from "react-native";

import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");

const images = [
  {
    image:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/kaduna_ynoxiz.png",
    color: "#CCE7D4",
    bgColor: "#14804B",
    name: "kaduna",
    option:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/kaduna-options_gx1nd6.png",
    stop: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/stop_j8uizk.png",
    play: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/playIcon_ezxz7v.png",
    playIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515728/kaduna-play_qeoxyg.png",
    pauseIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515728/kaduna-pause_emdsil.png",
    url: "http://197.210.168.147:8001/stream1",
    stream:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515728/kaduna-stream_b0hcz9.png",
  },
  {
    image:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/ilorin_rm396l.png",
    bgColor: "#891C2E",
    name: "ilorin",
    color: "#DBC296",
    option:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/options_shbwts.png",
    stop: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/red-stop_thwth1.png",
    play: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/red-play_j3geku.png",
    playIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515728/ilorin-play_it5iia.png",
    pauseIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/ilorin-pause_v4athf.png",
    url: "http://197.210.168.147:8000/stream",
    stream:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/red-reader_yulxpk.png",
  },
  {
    image:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515726/asaba_eldew8.png",
    color: "#BFE7FA",
    bgColor: "#129CD4",
    name: "asaba",
    option:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515726/asaba-options_ep5uaz.png",
    stop: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/red-stop_thwth1.png",
    play: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/red-play_j3geku.png",
    playIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515726/asaba-play_u2uw5e.png",
    pauseIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515726/asaba-pause_ukb0qp.png",
    url: "http://197.210.168.147:8001/stream1",
    stream:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/asaba-stream_gma54m.png",
  },
  {
    image:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515728/monarchrise-icon_ck0kdv.png",
    color: "#BFE7FA",
    bgColor: "#129CD4",
    name: "monarchrise",
    option:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515726/asaba-options_ep5uaz.png",
    stop: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/red-stop_thwth1.png",
    play: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/red-play_j3geku.png",
    playIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515726/asaba-play_u2uw5e.png",
    pauseIcon:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515726/asaba-pause_ukb0qp.png",
    url: "http://197.210.168.147:8001/stream1",
    stream:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/asaba-stream_gma54m.png",
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
        <Image
          source={{ uri: item.image }}
          style={{ resizeMode: "contain", width: 80, height: 80 }}
        />
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
