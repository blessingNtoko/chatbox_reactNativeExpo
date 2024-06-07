import { View, Text } from "react-native";
import React from "react";
import DetailsInput from "./DetailsInput";

export default function DetailsForm(props) {


  return (
    <View className="gap-6 pb-10">
      {props.isSignUp && <DetailsInput innerText="Your Name" inputRefs={props.getInputRefs} name="name"/>}
      <DetailsInput innerText="Your Email" inputRefs={props.getInputRefs} name="email" />
      <View className={!props.isSignUp ? "gap-5" : ""}>
        <DetailsInput innerText="Password" inputRefs={props.getInputRefs} name="password" />

        {!props.isSignUp && (
          <Text
            className="text-sm/[14px] font-medium"
            style={{ color: "#075BC9", fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif" }}
          >
            Forgot Password?
          </Text>
        )}
      </View>
      {props.isSignUp && <DetailsInput innerText="Confirm Password" inputRefs={props.getInputRefs} name="confirmPassword"/>}
    </View>
  );
}
