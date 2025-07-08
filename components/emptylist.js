import { View, Text, Image } from "react-native";
import React from "react";

const EmptyList = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("../assets/emptypage.png")}
        style={{ width: 300, height: 300 }}
      />
      <Text className="font-pbold text-2xl pt-5 ">No Posts</Text>
      <Text className="font-plight text-sm">
        Add some friends and come back :)
      </Text>
    </View>
  );
};

export default EmptyList;
