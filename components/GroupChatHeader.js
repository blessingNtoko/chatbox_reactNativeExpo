import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurHash } from "../utils/common";

export default function GroupChatHeader({ group, router }) {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-5">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={hp(4)} color="black" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-5">
              <Image
                style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
                source={
                    group?.photoURL
                    ? group?.photoURL
                    : "https://picsum.photos/seed/697/3000/2000"
                }
                placeholder={{ blurHash }}
                contentFit="cover"
                transition={500}
              />
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-700 font-medium"
              >
                {group?.groupName}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-6">
            <TouchableOpacity>
              <Ionicons name="call-outline" size={hp(3)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={hp(3)} color="black" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  )
}