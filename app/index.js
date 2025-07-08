import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import tabs from "./(tabs)/_layout";
import { Link, router, Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route } from "expo-router/build/Route";
import { useGlobalContext } from "../context/globalprovider";

export default function App() {
  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) router.replace("/home");
  }, [user]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
        <View className="  px-4 pt-20 justify-center items-center ">
          <Text className="font-pextrabold text-[30px] text-center">
            TheSocialNetw0rk
          </Text>
          <Image
            source={require("../assets/90a5a82d-b9e4-4292-b62e-044cacd03753.jpg")}
            resizeMode="contain"
            className="w-[300px] h-[300px] mt-5 rounded-xl"
          />
          <Text className="font-pbold mt-10 text-lg text-center">
            Connect. Share. Thrive.
          </Text>
          <Text className="font-pbold text-center mt-5 text-lg">
            Meet new friends, stay connected, and share your world effortlessly.
          </Text>
          <TouchableOpacity
            className="justify-center mt-10 rounded-xl border-4 w-[100%] h-20"
            onPress={() => router.push("/sign-in")}
          >
            <Text className="text-center font-pbold text-2xl">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 10,
    backgroundColor: "#939393",
    alignItems: "center",
    //justifyContent: "center",
    fontFamily: "Matura MT Script Capitals",
    gap: 20,
  },
  safeStyles: {
    alignItems: "center",
    backgroundColor: "#262626",
    //flex: 1,
  },
});
