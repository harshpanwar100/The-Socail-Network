import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import LikeButton from "../../../components/LikeButton";
import Comment from "../../../components/Comment";
import { useGlobalContext } from "../../../context/globalprovider";
const userPost = () => {
  const { postId } = useLocalSearchParams();
  const { userData, profilePic } = useGlobalContext();
  return (
    <SafeAreaView>
      <View>
        <View className="flex-row items-center" style={{ paddingLeft: 5 }}>
          <Image
            source={{ uri: profilePic }}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />
          <Text style={{ paddingLeft: 10 }}>{userData.username}</Text>
        </View>
        <View className="justify-center items-center pt-2">
          <Image
            source={{ uri: postId }}
            style={{ width: 370, height: 400, borderRadius: 25 }}
          />
        </View>
        <View
          style={{
            paddingTop: 5,
            paddingRight: 30,
            flexDirection: "row-reverse",
            gap: 10,
          }}
        >
          <LikeButton />
          <Comment />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default userPost;
