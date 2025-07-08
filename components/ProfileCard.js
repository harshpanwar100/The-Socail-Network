import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const ProfileCard = ({ data }) => {
  return (
    <View>
      <Image source={{ uri: data }} style={{ width: 133, height: 150 }} />
    </View>
  );
};

export default ProfileCard;
