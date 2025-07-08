import { useIsFocused } from "@react-navigation/native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraViewRef,
} from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ApiService from "../../services/api";
import { useContext } from "react";
import { useGlobalContext } from "../../context/globalprovider";

export default function Post() {
  const { user } = useGlobalContext();

  const ref = useRef<CameraView>(null);
  const isFocused = useIsFocused();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const flash_on = require("../../assets/flash_on.png");
  const flash_off = require("../../assets/flash_off.png");

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePicture() {
    if (ref.current) {
      try {
        const photo = await ref.current.takePictureAsync({});
        if (photo && photo.uri) {
          await ApiService.uploadImage(user.uid, photo.uri);
          console.log(photo);
        } else {
          console.log("No photo captured.");
        }
      } catch (error) {
        console.log("Error taking picture:", error);
      }
    }
  }

  function toggleTorch() {
    setTorch((current) => (current == false ? true : false));
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className=" pt-20">
        {isFocused && (
          <CameraView
            style={styles.camera}
            facing={facing}
            enableTorch={torch}
            ref={ref}
          ></CameraView>
        )}
      </View>
      <View className="flex-1 flex-row  justify-between items-center pl-5 pr-5">
        <TouchableOpacity onPress={toggleCameraFacing}>
          <Image
            className=" w-20 h-20 "
            source={require("../../assets/rotate.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <Image
            className=" w-20 h-20"
            source={require("../../assets/photo_icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTorch}>
          <Image className=" w-20 h-20" source={torch ? flash_off : flash_on} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: 500,
    width: "100%",
  },
});
