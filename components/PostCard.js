import { View, Text, Image, Button } from "react-native";
import React from "react";
import LikeButton from "./LikeButton";
import Comment from "./Comment";

const PostCard = ({ data }) => {
  return (
    <View>
      <View className="flex-row items-center" style={{ paddingLeft: 5 }}>
        <Image
          source={data.image}
          style={{ width: 45, height: 45, borderRadius: 50 }}
        />
        <Text style={{ paddingLeft: 10 }}>{data.username}</Text>
      </View>
      <View className="justify-center items-center pt-2">
        <Image
          source={data.image}
          style={{ width: 370, height: 300, borderRadius: 25 }}
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
  );
};

export default PostCard;
