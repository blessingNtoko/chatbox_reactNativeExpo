import { View, Text, Platform } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ios = Platform.OS == "ios";
export default function HomeHeader() {
    const {top} = useSafeAreaInsets();
  return (
    <View style={{paddintTop: ios ? top : top + 10}} className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded">
      <Text>HomeHeader</Text>
    </View>
  )
}