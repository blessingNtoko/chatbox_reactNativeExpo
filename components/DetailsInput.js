import { View, Text, TextInput } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function DetailsInput(props) {
  return (
    <View
      style={{ height: hp(7), borderBottomColor: "#CDD1D0" }}
      className="flex py-3 border-b"
    >
      <Text className="font-medium text-sm/[14px]" style={{color: "#24786D"}}>{props.name}</Text>
      <TextInput
        label={props.name}
        className="flex-1 font-semibold text-neutral-600"
      />
    </View>
  );
}
