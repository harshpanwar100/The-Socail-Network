import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  FlatListComponent,
  FlatList,
  TextInput,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";

const Comment = () => {
  const comments = [
    { id: "1", comment: "greate photo bro 🔥🔥", username: "harshpanwar007" },
    { id: "2", comment: "I wanna go there too 😭", username: "gitesh_rawat1" },
    {
      id: "3",
      comment: "When are you coming Back",
      username: "kendalljenner_fr",
    },
  ];

  const [showComment, setshowComment] = useState(false);
  return (
    <View>
      <TouchableOpacity activeOpacity={1} onPress={() => setshowComment(true)}>
        <Icon name="chatbubble" size={26} color={"hotpink"} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showComment}>
        <BlurView
          intensity={100}
          tint="light"
          style={{ ...StyleSheet.absoluteFillObject }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "hotpinksd",
              borderRadius: 20,
              padding: 10,
              height: 400,
              width: 400,
            }}
          >
            <TouchableOpacity
              onPress={() => setshowComment(false)}
              style={{ flexDirection: "row-reverse" }}
            >
              <Image
                source={require("../assets/close.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <View className="pt-5">
              <TextInput
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 25,
                  padding: 10,
                }}
                placeholder="add a comment"
                placeholderTextColor="light black"
              ></TextInput>
            </View>
            <View className="p-5 flex-1">
              <FlatList
                className="flex-1 "
                contentContainerStyle={{ flexGrow: 1 }}
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ paddingBottom: 15 }}>
                    <Text className="font-pbold">
                      {item.username}
                      <Text className="font-plight">: {item.comment}</Text>
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Comment;
