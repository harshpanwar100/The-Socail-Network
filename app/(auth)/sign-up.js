import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { auth, database } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database";
import { addUser } from "../../firebaseConfig";

const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handelSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await addUser(user.uid, username, email);
      Alert.alert("User Registered Successfully");
      router.replace("/home");
    } catch (error) {}
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="pt-20 px-4">
        <Text className="font-pextrabold text-[30px]">TheSocialNetw0rk</Text>
        <Text className="font-pbold mt-10">
          Sign up to{" "}
          <Text className="font-pextrabold text-lg ">TheNetw0rk</Text>
        </Text>
        <Text className="font-pregular mt-10">Username</Text>
        <TextInput
          className=" rounded-xl border border-black h-16 mt-2 px-6"
          value={username}
          onChangeText={setusername}
        />
        <Text className="font-pregular mt-10">Email</Text>
        <TextInput
          className=" rounded-xl border border-black h-16 mt-2 px-6"
          inputMode="email"
          value={email}
          onChangeText={setemail}
        />
        <Text className="font-pregular mt-10">Password</Text>
        <TextInput
          className=" rounded-xl border border-black h-16 mt-2 px-6"
          secureTextEntry={true}
          value={password}
          onChangeText={setpassword}
        />
        <TouchableOpacity
          style={{ backgroundColor: "lightblue" }}
          className="justify-center mt-10 rounded-xl border-4 w-[100%] h-20"
          onPress={handelSignUp}
        >
          <Text className="text-center font-pbold text-2xl">Sign up</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-end items-center">
        <Text className="">
          Have an account already?
          <Link href="/sign-in">
            <Text className="font-pbold"> Sign in</Text>
          </Link>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
