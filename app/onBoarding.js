import { View, Text, Image, StyleSheet, Pressable, StatusBar } from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import { useRouter, useSegments } from "expo-router";
import Button from "../components/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function OnBoarding() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf")
  });

  function handlePress() {
    router.push("signUp");
  }

  return (
    <Background >
      <View style={styles.container} className="flex-1 gap-12">
        <StatusBar style="dark" />
        <View className="flex justify-center items-center pb-10">
          <Image source={require("../assets/images/chatbox_logo.png")} />
        </View>

        <View className="flex flex-row flex-wrap px-5">
          <Text style={{...styles.text, fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif"}} className="text-5xl/[55px] font-normal">
            Connect with friends
          </Text>
          <Text style={{...styles.text, fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif"}} className="text-5xl/[55px] font-bold">
            easily & quickly
          </Text>
        </View>

        <View className="">
          <Text style={{...styles.text, fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif"}} className="font-medium text-base/[26px] text-center">
          Our chat app is the perfect way to stay connected with friends and family.
          </Text>
        </View>
        
        <View className="flex flex-row justify-center items-center gap-8">
          <Image source={require("../assets/images/facebook_black.png")} />
          <Image source={require("../assets/images/google_black.png")} />
          <Image source={require("../assets/images/apple_black.png")} />
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

        <View className="">
          {loading ? (
            <View className="flex-row justify-center">
              <Loading size={hp(8)} />
            </View>
          ) : (
            <Button btnColor="white" btnText="Sign Up" txtColor="black" handlePress={handlePress}/>
          )}
        </View>

        <View className="flex flex-row justify-center items-center ">
          <Text
            style={{ color: "white", fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif" }}
            className="font-medium text-sm/[14px]"
          >
            Existing account?{" "}
          </Text>
          <Pressable onPress={() => router.push("logIn")}>
            <Text
              style={{ color: "#24786D", fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif" }}
              className="font-medium text-sm/[14px]"
            >
              Log in
            </Text>
          </Pressable>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: hp(15),
    paddingHorizontal: wp(5)
  },
  text: {
    color: "white",
  }
})
