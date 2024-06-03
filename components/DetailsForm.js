import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function DetailsForm(props) {
  return (
    <View className="gap-6 pb-10">
      {props.isSignUp && (
        <View
          style={{ height: hp(7) }}
          className="flex-row gap-4 px-4 items-center border-b-2 border-b-gray-600"
        >
          <TextInput
            label="Your Name"
            className="flex-1 font-semibold text-neutral-700"
            placeholder="Your Name"
          />
        </View>
      )}
      <View
        style={{ height: hp(7) }}
        className="flex-row gap-4 px-4 items-center border-b-2"
      >
        <TextInput
          label="Your Email"
          className="flex-1 font-semibold text-neutral-700"
          placeholder="Your Email"
        />
      </View>
      <View
        style={{ height: hp(7) }}
        className="flex-row gap-4 px-4 items-center border-b-2 border-b-gray-600"
      >
        <TextInput
          label="Password"
          className="flex-1 font-semibold text-neutral-700"
          placeholder="Password"
        />
      </View>
      {props.isSignUp && (
        <View
          style={{ height: hp(7) }}
          className="flex-row gap-4 px-4 items-center border-b-2"
        >
          <TextInput
            label="Confirm Password"
            className="flex-1 font-semibold text-neutral-700"
            placeholder="Confirm Password"
          />
        </View>
      )}
    </View>
  );
}
