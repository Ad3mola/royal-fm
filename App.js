/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import RootNavigator from "./app/navigators/RootNavigator";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const App = () => {
  const [isReady, setIsReady] = useState(true);
  const [showRealApp, setShowRealApp] = useState(false);
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("intro4");
    if (token) {
      setShowRealApp(true);
    }
    setIsReady(false);
  };
  const cacheResourcesAsync = async () => {
    const images = [require("./assets/royal-splash.png")];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };
  if (isReady) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={() => checkToken()}
        onError={console.warn}
      />
    );
  }
  return (
    <RootNavigator showRealApp={showRealApp} setShowRealApp={setShowRealApp} />
  );
};

export default App;
