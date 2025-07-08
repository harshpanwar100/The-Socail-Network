import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyList from "../../components/emptylist";
import PostCard from "../../components/PostCard";
import { getAuth, signOut } from "firebase/auth";
import { router } from "expo-router";
const Home = () => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.replace("/sign-in");
        console.log("User signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };
  //const user = auth.currentUser;
  const images = [
    { image: require("../../assets/mt.jpg"), username: "harshpanwar007" },
    { image: require("../../assets/dog.jpg"), username: "gitesh_rawat1" },
    { image: require("../../assets/ftbal.jpg"), username: "kendalljenner_fr" },
  ];

  return (
    <SafeAreaView className=" flex-1 " edges={["top"]}>
      <FlatList
        className="flex-1 pl-3 pr-3 "
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <PostCard data={item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="pt-2 items-center pb-10">
            <Text className="text-3xl font-pbold">TheSocialNetw0rk</Text>
            <TouchableOpacity onPress={logout}>
              <Text>Log out</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 ">
            <EmptyList />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
