import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../../constants/icons";

const TabIcon = ({ icon, focused, focIcon }) => {
  return (
    <View>
      <Image
        source={focused ? focIcon : icon}
        resizeMode="contain"
        className={"w-8 h-8"}
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          //tabBarInactiveTintColor: "#5c5c5c",
          tabBarStyle: {
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.home}
                focused={focused}
                focIcon={icons.home_foc}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: "Post",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.postt}
                focused={focused}
                focIcon={icons.postt_foc}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.search}
                focused={focused}
                focIcon={icons.search_foc}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={icons.profile}
                focused={focused}
                focIcon={icons.profile_foc}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
