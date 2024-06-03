import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useRouter, useSegments } from "expo-router";
import DetailsForm from "../components/DetailsForm";

export default function SignUp() {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });
  const router = useRouter();

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
            className="text-lg/[18px] font-bold"
          >
            Sign up with{" "}
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-lg/[18px] font-bold border-b-4 border-b-emerald-700"
          >
            Email
          </Text>
        </View>
        <View className="items-center">
          <Text
            style={{ fontFamily: "Poppins-Regular", color: "#797C7B" }}
            className="text-neutral text-center font-bold text-base/[20px]"
          >
            Get chatting with friends and family today by signing up for our
            chat app!
          </Text>
        </View>
        {/* input */}
        <DetailsForm isSignUp={true}/>

        <TouchableOpacity
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

        {/* sign up  */}
        <View className="flex-row justify-center items-center pt-5">
          <Text
            style={{ color: "#24786D", fontFamily: "Poppins-Regular" }}
            className="font-medium text-sm/[14px]"
          >
            Existing account?{" "}
          </Text>
          <Pressable onPress={() => router.push("logIn")}>
            <Text
              style={{ color: "#24786D", fontFamily: "Poppins-Regular" }}
              className="font-medium text-sm/[14px]"
            >
              Log in
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
