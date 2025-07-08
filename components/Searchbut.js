import { View, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const Searchbut = ({ searchQuery, setSearchQuery }) => {
  return (
    <View
      className=" flex-row items-center border-3 border-red-900 rounded-full pl-3 pr-3 pt-3 pb-3"
      style={{ borderWidth: 2, borderRadius: 50 }}
    >
      <Icon name="search" size={26} color={"grey"} />
      <TextInput
        style={{ width: "100%", paddingRight: 30 }}
        className=" h-[50px] w-full pl-3 items-center text-3xl pr-10 "
        placeholder="Search"
        returnKeyType="search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default Searchbut;
