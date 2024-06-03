import { View, Text } from 'react-native';
import React from 'react';
import { Slot } from "expo-router";

export default function _layout() {
  return (
    <View className="bg-red-200 text-center">
        <Slot />
    </View>
  )
}