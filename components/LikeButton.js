import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const LikeButton = () => {
  const [islike, setIslike] = useState(false);
  /*const toggle = () => {
    setIslike(!islike);
  };*/
  return (
    <TouchableOpacity onPress={() => setIslike(!islike)}>
      <Icon
        name={islike ? "heart" : "heart-outline"}
        size={30}
        color={islike ? "red" : "black"}
      />
    </TouchableOpacity>
  );
};

export default LikeButton;
