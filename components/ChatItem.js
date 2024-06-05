import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { blurHash } from "../utils/common";

export default function ChatItem({ itemData, router, index }) {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });

  const styles = StyleSheet.create({
    textFont: {
      fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif",
    },
  });

  function openChatRoom() {
    // chat room with user
    router.push({pathname: "/ChatRoom", params: itemData})

  }

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{
        justifyContent: "space-between",
        paddingBottom: 5,
        marginBottom: 4,
        gap: 3,
        marginVertical: 4,
      }}
      className="flex-row items-center"
    >
      <Image
        style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
        source={
          itemData?.profileImg
            ? itemData?.profileImg
            : "https://picsum.photos/seed/696/3000/2000"
        }
        placeholder={{ blurHash }}
        contentFit="cover"
        transition={500}
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
            {itemData.name}
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
