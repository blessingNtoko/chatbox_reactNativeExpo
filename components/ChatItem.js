import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";

export default function ChatItem({itemData, router, index}) {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });

  const styles = StyleSheet.create({
    textFont: {
      fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif",
    },
  });

  return (
    <TouchableOpacity
      style={{ justifyContent: "space-between" }}
      className="flex-row mx-4 items-center gap-3 mb-4 pb-4"
    >
      <Image
        source={require("../assets/images/react-logo.png")}
        style={{ height: hp(6), width: hp(6) }}
        className="rounded-full"
      />

      {/* will add name and last message to user */}
      <View className="flex-1 gap-1">
        <View style={{ justifyContent: "space-between" }} className="flex-row">
          <Text
            style={{
              fontSize: hp(2),
              fontFamily: styles.textFont.fontFamily,
            }}
            className="font-semibold"
          >
            John Doe
          </Text>
          <Text
            style={{
              fontSize: hp(1.4),
              fontFamily: styles.textFont.fontFamily,
            }}
            className="font-medium"
          >
            Time
          </Text>
        </View>
        <Text
          style={{
            fontSize: hp(1.4),
            fontFamily: styles.textFont.fontFamily,
          }}
          className="font-medium"
        >
            this is dummy text
        </Text>
      </View>
    </TouchableOpacity>
  );
}
