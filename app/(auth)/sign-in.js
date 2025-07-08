import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useRouter } from "expo-router";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [gohome, setgohome] = useState(false);
  const router = useRouter();

  const handelSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("done");
      setgohome(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (gohome) {
      router.replace("/home");
    }
  }, [gohome, router]);

  return (
    <SafeAreaView className="flex-1">
      <View className="pt-20 px-4">
        <Text className="font-pextrabold text-[30px]">TheSocialNetw0rk</Text>
        <Text className="font-pbold mt-10">
          Login to <Text className="font-pextrabold text-lg ">TheNetw0rk</Text>
        </Text>
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
          onPress={handelSignIn}
        >
          <Text className="text-center font-pbold text-2xl">Log in</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-end items-center">
        <Text className="">
          Dont have an account?
          <Link href="/sign-up">
            <Text className="font-pbold"> Sign up</Text>
          </Link>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({});
