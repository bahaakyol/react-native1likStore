import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Navigation from "./src/navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import store from "./src/store/index";
import { Provider } from "react-redux";

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <Provider store = {store}>
      <StatusBar style="auto" />
      <Navigation />
      </Provider>
  );
}
