import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
enableScreens();

const profileLayout = () => {
  return (
    <>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="userPost" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </>
  );
};

export default profileLayout;
