import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import ProfileCard from "../../../components/ProfileCard";
import { useGlobalContext } from "../../../context/globalprovider";
import ApiService from "../../../services/api";
import { router } from "expo-router";

const index = () => {
  const { userData, user, isloading } = useGlobalContext();

  const [profilePic, setProfilePic] = useState(null); // Add local state for profile pic
  const [loading, setLoading] = useState(false);
  const [imageurl, setimageurl] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData?.userId) return;

      try {
        setLoading(true);

        // Fetch both profile pic and images concurrently
        const [profilePicUrl, imageUrls] = await Promise.all([
          ApiService.getProfilePicture(userData.userId),
          ApiService.getUserImages(userData.userId),
        ]);

        setProfilePic(profilePicUrl);
        setimageurl(imageUrls);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // You might want to show an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userData?.userId]);

  const showLoading = isloading || loading;

  return (
    <SafeAreaView className="pt-2 flex-1  ">
      {isloading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          ListHeaderComponent={
            <View className="pl-3 pr-3 pb-3">
              <View className=" items-center">
                <Text className="text-3xl font-pbold justify-center">
                  {userData.username}
                </Text>
              </View>
              <View className="pt-10 flex-row-reverse justify-between items-start">
                {profilePic ? (
                  <Image
                    source={{ uri: profilePic }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: "#f0f0f0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>No Pic</Text>
                  </View>
                )}
                <View>
                  <Text className="font-plight">{userData.name}</Text>
                  <Text>{userData.bio}</Text>
                  <View className="flex-row gap-3">
                    <Text className="text-l font-pbold">
                      {imageurl.length}{" "}
                      <Text className="text-l font-plight">Posts</Text>
                    </Text>

                    <Text className="text-l font-pbold">
                      7 <Text className="text-l font-plight">Friends</Text>
                    </Text>
                  </View>
                </View>
              </View>

              <View className="pt-3">
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 30,
                    backgroundColor: "lightgrey",
                    borderRadius: 50,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          data={imageurl}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="pl-1 pb-1">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  router.push(`/(tabs)/profile/userPost?postId=${item}`)
                }
              >
                <ProfileCard data={item} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};
export default index;
