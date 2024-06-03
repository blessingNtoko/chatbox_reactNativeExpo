import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DetailsInput from "./DetailsInput";

export default function DetailsForm(props) {
  return (
    <View className="gap-6 pb-10">
      {props.isSignUp && <DetailsInput name="Your Name" />}
      <DetailsInput name="Your Email" />
      <View className={!props.isSignUp ? "gap-5" : ""}>
        <DetailsInput name="Password" />

        {!props.isSignUp && (
          <Text
            className="text-sm/[14px] font-medium"
            style={{ color: "#075BC9", fontFamily: "Poppins-Regular" }}
          >
            Forgot Password?
          </Text>
        )}
      </View>
      {props.isSignUp && <DetailsInput name="Confirm Password" />}
    </View>
  );
}
