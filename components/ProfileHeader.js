import { View, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function ProfileHeader({ router }) {
  return (
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View className="flex-row items-center gap-5 ml-5">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back-outline"
                  size={hp(4)}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ),
          headerBackground: () => (
            <View style={{flex: 1, backgroundColor: "#000E08"}}></View>
          )
        }}
      />
  );
}
