import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { useRouter, useSegments } from "expo-router";


export default function Button(props) {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <TouchableOpacity
      onPress={props.handlePress}
      style={{ backgroundColor: props.btnColor, height: hp(7) }}
      className="rounded-2xl justify-center items-center"
    >
      <Text
        className="font-bold text-base/[16px] tracking-wider"
        style={{ fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif", color: props.txtColor }}
      >
        {props.btnText}
      </Text>
    </TouchableOpacity>
  );
}

