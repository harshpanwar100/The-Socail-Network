import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getUserData, addFriend } from "../../../firebaseConfig";
//import ProfileCard from "../../components/ProfileCard";
//import { getImageUrls } from "../../../supabase";
import ProfileCard from "../../../components/ProfileCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../../context/globalprovider";
const userProfile = () => {
  const { userData } = useGlobalContext();
  const { user } = useLocalSearchParams();

  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    const fetchuser = async () => {
      const ud = await getUserData(user);
      setUserdata(ud);
    };
    fetchuser();
  }, [user]);

  //const userdata = getUserData(user);
  const [imageurl, setimageurl] = useState([]);
  useEffect(() => {
    const fetchurl = async () => {
      const url = await getImageUrls(user);
      setimageurl(url);
    };

    fetchurl();
  }, [user.userId]);

  const addFriends = async () => {
    console.log(userData.userId, userdata.userId);
    await addFriend(userData.userId, userdata.userId);
  };
  return (
    <SafeAreaView className="pt-2 flex-1  ">
      <FlatList
        ListHeaderComponent={
          <View className="pl-3 pr-3 pb-3">
            <View className=" items-center">
              <Text className="text-3xl font-pbold justify-center">
                {userdata.username}
              </Text>
            </View>
            <View className="pt-10 flex-row-reverse justify-between items-start">
              <Image
                source={{
                  uri: "https://xztncvbfrfwhrfkfbbmt.supabase.co/storage/v1/object/public/user/K61q2SlOMSRloaXCQp69qE00aDs1/99dcccd8c32befc06c87f0019a76cc6a.jpg",
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <View>
                <Text className="font-plight">{userdata.name}</Text>
                <Text>{userdata.bio}</Text>
                <View className="flex-row gap-3">
                  <Text className="text-l font-pbold">
                    {imageurl.length}{" "}
                    <Text className="text-l font-plight">Posts</Text>
                  </Text>

                  <Text className="text-l font-pbold">
                    1 <Text className="text-l font-plight">Friends</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View className="pt-3">
              <TouchableOpacity
                onPress={addFriends}
                style={{
                  width: "100%",
                  height: 30,
                  backgroundColor: "lightblue",
                  borderRadius: 50,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Add Friend</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={imageurl}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="pl-1 pb-1">
            <ProfileCard data={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default userProfile;
