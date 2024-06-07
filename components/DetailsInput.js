import { View, Text, TextInput } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function DetailsInput(props) {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <View
      style={{ height: hp(7), borderBottomColor: "#CDD1D0" }}
      className="flex py-3 border-b"
    >
      <Text
        className="font-medium text-sm/[14px]"
        style={{ color: "#24786D", fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif" }}
      >
        {props.innerText}
      </Text>
      <TextInput
        secureTextEntry={props.name === "password" || props.name === "confirmPassword"}
        style={{ fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif" }}
        className="flex-1 font-semibold text-neutral-600"
        onChangeText={(value) => props.inputRefs(props.name, value)}
      />
    </View>
  );
}
