import { View, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useRouter, useSegments } from "expo-router";
import DetailsForm from "../components/DetailsForm";
import CustomKeyboardView from "../components/CustomKeyboardView";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  function getSignUpRefs(inputName, value) {
    console.log("sign up :: ", inputName, value);
    if (inputName === "name") {
      nameRef.current = value;
    } else if (inputName === "email") {
      emailRef.current = value;
    } else if (inputName === "password") {
      passwordRef.current = value;
    } else {
      confirmPasswordRef.current = value;
    }
  }

  function detailsCheck() {
      if (
        !nameRef.current ||
        !emailRef.current ||
        !passwordRef.current ||
        !confirmPasswordRef.current
      ) {
        Alert.alert("Sign Up", "Please make sure all fields are filled in!");
        return;
      }

      if (passwordRef.current !== confirmPasswordRef.current) {
        Alert.alert("Sign Up", "The passwords you have entered do not match!");
        return;
      }
  }

 async function handleSignUp() {

    //handle sign up
  }

  return (
    <CustomKeyboardView>
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
        <DetailsForm isSignUp={true} getInputRefs={getSignUpRefs} />

        <View>
          {loading ? (
            <View className="flex-row justify-center">
              <Loading size={hp(8)} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={detailsCheck}
              style={{ backgroundColor: "#24786D", height: hp(7) }}
              className="rounded-2xl justify-center items-center"
            >
              <Text
                className="text-white font-bold text-base/[16px] tracking-wider"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                Creat an account
              </Text>
            </TouchableOpacity>
          )}
        </View>

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
    </CustomKeyboardView>
  );
}
