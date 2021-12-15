import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ImageBackground,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SlidingPanel from "../components/SlidingPanel";
import { Audio } from "expo-av";
import moment from "moment";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// import SlidingPanel from "react-native-sliding-up-down-panels";
const { width, height } = Dimensions.get("window");
const slides = [
  {
    key: "one",
    image:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/onboarding1_clgsi3.png",
    title: "Listen Live",
    text: "Never miss a show, listen to our channel anywhere, anytime",
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF",
  },
  {
    key: "two",
    image:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/onboarding2_i0idle.png",
    title: "Schedule Shows",
    text: "Set reminders for your shows, and get notified",
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF",
  },
  {
    key: "three",
    image:
      "https://res.cloudinary.com/drkvge86d/image/upload/v1639515729/onboarding3_or17xm.png",
    title: "Switch Frequencies",
    text: "Switch between our stations",
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF",
  },
];

const Stack = createStackNavigator();

const RootNavigator = ({ showRealApp, setShowRealApp }) => {
  const [panelPosition, setPanelPosition] = useState(1);
  const [channel, setChannel] = useState({});
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [upnext, setUpnext] = useState([]);
  const [on, setOn] = useState([]);
  const [theOne, setTheOne] = useState([]);
  console.log(isPlaying);
  const [day, setDay] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [live, setLive] = useState({});
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  async function schedulePushNotification(data) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Time for ${data?.name}!`,
      },
      trigger: {
        hour: data?.time.split(":")[0],
        minute: data?.time.split(":")[1],
      },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const days = {
    monday: require(`../../schedule/monday.json`),
    tuesday: require(`../../schedule/tuesday.json`),
    wednesday: require(`../../schedule/wednesday.json`),
    thursday: require(`../../schedule/thursday.json`),
    friday: require(`../../schedule/friday.json`),
    saturday: require(`../../schedule/saturday.json`),
    sunday: require(`../../schedule/sunday.json`),
  };
  const createTwoButtonAlert = (theOne) =>
    Alert.alert("", "Do you want to set a reminder for this show?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          schedulePushNotification(theOne);
          Alert.alert("", "Reminder set");
        },
      },
    ]);

  useEffect(() => {
    const day = moment().format("dddd");
    setDay(day.toLowerCase());
    const data = days[day.toLowerCase()];
    const time = moment().format("HH");
    const all = data.filter((each) => each.time > time);
    const backup = time - 1;
    const latest = data.filter((each) =>
      each.time.split(":")[0].includes(time)
    );
    const newShchedule = all.filter(
      (each) => !each.name.includes(latest[0]?.name)
    );
    console.log("NAMMMEEE", latest[0]?.name);
    setSchedule(newShchedule);
    setUpnext(newShchedule.slice(0, 2));
    setLive(latest);
    setOn(latest);
    // console.log("latest", latest);
  }, []);

  async function playSound(custom) {
    const audioMode = {
      stayActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    };
    Audio.setAudioModeAsync(audioMode);

    const { sound } = await Audio.Sound.createAsync({
      uri: custom ? custom : `${channel.url}`,
    });
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
  }

  async function playAfterPause() {
    await sound.playAsync();
    setIsPlaying(true);
  }

  async function pauseSound() {
    await sound.pauseAsync();
    setIsPlaying(false);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slides}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.button}>
        <View style={styles.buttonInner}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <View style={styles.buttonInner}>
          <Text style={styles.buttonText}>Done</Text>
        </View>
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View style={styles.button}>
        <View style={styles.buttonInnerSkip}>
          <Text style={styles.buttonSkip}>Skip</Text>
        </View>
      </View>
    );
  };
  const onDone = () => {
    const items = [["intro4", "intro4"]];
    AsyncStorage.multiSet(items);
    setShowRealApp(true);
  };

  if (showRealApp) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" options={{ channel, setChannel }}>
            {(props) => (
              <HomeScreen
                channel={channel}
                setChannel={setChannel}
                playSound={playSound}
                upnext={upnext}
                on={on}
                createTwoButtonAlert={createTwoButtonAlert}
                isPlaying={isPlaying}
                playAfterPause={playAfterPause}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Details">
            {(props) => (
              <DetailScreen
                channel={channel}
                setChannel={setChannel}
                playSound={playSound}
                live={live}
                schedule={schedule}
                day={day}
                createTwoButtonAlert={createTwoButtonAlert}
                {...props}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <SlidingPanel
          // visible={false}
          setPanelPosition={setPanelPosition}
          headerLayoutHeight={100}
          isPlaying={isPlaying}
          headerLayout={() => {
            if (panelPosition === 0) {
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width,
                    paddingTop: 20,
                    paddingHorizontal: 20,
                  }}
                >
                  <View></View>
                  <View>
                    <Text
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: 5,
                        paddingHorizontal: 15,
                        fontWeight: "bold",
                      }}
                    >
                      ON AIR
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{
                        uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515727/down_syasjz.png",
                      }}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </View>
              );
            } else {
              if (!isPlaying) {
                return null;
              }
              return (
                <>
                  <View
                    style={{
                      ...styles.headerLayoutStyle,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 15,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 50,
                          marginRight: 20,
                        }}
                        source={{
                          uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/play_qvekzh.png",
                        }}
                      />
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: channel.bgColor,
                            fontWeight: "bold",
                            fontSize: 18,
                          }}
                        >
                          {live[0]?.name}
                        </Text>
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          {live[0]?.time}
                        </Text>
                      </View>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={isPlaying ? pauseSound : playAfterPause}
                    >
                      <Image
                        resizeMode="cover"
                        style={{ width: 20, height: 20 }}
                        source={{
                          uri: isPlaying ? channel.stop : channel.play,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </>
              );
            }
          }}
          slidingPanelLayout={() => (
            <View
              style={{
                ...styles.slidingPanelLayoutStyle,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: "20%",
                  paddingRight: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#A2A2A2",
                    fontSize: 12,
                  }}
                >
                  95.1MHz
                </Text>
              </View>
              <View
                style={{
                  height: "80%",
                  backgroundColor: channel.bgColor,
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 125,
                    borderWidth: 20,
                    borderColor: "rgba(255,255,255, 0.5)",
                    position: "absolute",
                    top: -100,
                    overflow: "hidden",
                    shadowColor:
                      "0px 5.47988px 6.39319px -0.913313px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/drkvge86d/image/upload/v1639515730/play_qvekzh.png",
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </View>
                <Text
                  style={{
                    // paddingTop: 130,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {live[0]?.name}
                </Text>
                <Image
                  style={{
                    height: 50,
                    marginVertical: 20,
                    width: "90%",
                  }}
                  source={{ uri: channel.stream }}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {live[0]?.time}
                </Text>
                <TouchableWithoutFeedback
                  onPress={isPlaying ? pauseSound : playAfterPause}
                >
                  <Image
                    style={{ height: 50, width: 50, marginTop: 10 }}
                    resizeMode="cover"
                    source={{
                      uri: isPlaying ? channel.pauseIcon : channel.playIcon,
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        />
      </NavigationContainer>
    );
  } else {
    return (
      <AppIntroSlider
        activeDotStyle={{ backgroundColor: "#891C2E" }}
        dotStyle={{
          backgroundColor: "transparent",
          borderColor: "#000000",
          borderWidth: 1,
        }}
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        showSkipButton={true}
        bottomButton={true}
      />
    );
  }
};

const styles = StyleSheet.create({
  slides: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 250, 224, 0.67), rgba(255, 250, 224, 0.67)), #FFFFFF",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    width: "60%",
    flex: 1,
    margin: "auto",
    height: 46,
    backgroundColor: "#891C2E",
    borderRadius: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInnerSkip: {
    width: "60%",
    flex: 1,
    margin: "auto",
    height: 46,
    backgroundColor: "transparent",
    borderRadius: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 14,
  },
  buttonSkip: {
    color: "#232323",
    fontWeight: "800",
    fontSize: 14,
  },
  image: {
    marginBottom: 15,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 15,
    color: "#891C2E",
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    color: "#3E3E3E",
    paddingBottom: 50,
  },
  container: {
    flex: 1,
  },
  bodyViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLayoutStyle: {
    width,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  slidingPanelLayoutStyle: {
    width,
    height,
    // backgroundColor: "#7E52A0",
    // justifyContent: "center",
    // alignItems: "center",
  },
  commonTextStyle: {
    color: "white",
    fontSize: 18,
  },
});

export default RootNavigator;
