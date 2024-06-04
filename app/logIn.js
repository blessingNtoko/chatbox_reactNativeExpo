import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Alert
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useRouter, useSegments } from "expo-router";
import DetailsForm from "../components/DetailsForm";
import Loading from "../components/Loading";

export default function LogIn() {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  function getLogInRefs(inputName, value) {
    console.log("login", inputName, value);
    if (inputName === "email") {
      emailRef.current = value;
    } else {
      passwordRef.current = value;
    }
  }

  async function handleLogin() {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Log in", "Please make sure all fields are filled in!");
      return;
    }

    //log in process
  }

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(15), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        <View className="flex-row items-center justify-center">
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-lg/[18px] font-bold border-b-4 border-b-emerald-700"
          >
            Log
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-lg/[18px] font-bold"
          >
            {" "}
            in to Chatbox
          </Text>
        </View>
        <View className="items-center">
          <Text
            style={{ fontFamily: "Poppins-Regular", color: "#797C7B" }}
            className="text-neutral text-center font-bold text-base/[20px]"
          >
            Welcome back! Sign in using your social account or email to
            continue.
          </Text>
        </View>
        {/* {signIn image} */}
        <View className="flex flex-row justify-center items-center gap-8">
          <Image source={require("../assets/images/facecbook.png")} />
          <Image source={require("../assets/images/google.png")} />
          <Image source={require("../assets/images/apple.png")} />
        </View>
        <View className="flex flex-row justify-center items-center">
          <View
            style={{ backgroundColor: "#cdd1d0" }}
            className="flex-1 h-0.5"
          ></View>
          <Text className="text-center w-12" style={{ color: "#797C7B" }}>
            OR
          </Text>
          <View
            style={{ backgroundColor: "#cdd1d0" }}
            className="flex-1 h-0.5"
          ></View>
        </View>
        {/* input */}
        <DetailsForm isSignUp={false} getInputRefs={getLogInRefs} />

        <View>
          {loading ? (
            <View className="flex-row justify-center">
              <Loading size={hp(8)}/>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLogin}
              style={{ backgroundColor: "#24786D", height: hp(7) }}
              className="rounded-2xl justify-center items-center"
            >
              <Text
                className="text-white font-bold text-base/[16px] tracking-wider"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* sign up  */}
        <View className="flex-row justify-center items-center pt-5">
          <Pressable onPress={() => router.push("signUp")}>
            <Text
              style={{ color: "#24786D", fontFamily: "Poppins-Regular" }}
              className="font-medium text-sm/[14px]"
            >
              Create An Account
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
