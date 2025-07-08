import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
enableScreens();

const searchLayout = () => {
  return (
    <>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="userProfile" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </>
  );
};

export default searchLayout;
