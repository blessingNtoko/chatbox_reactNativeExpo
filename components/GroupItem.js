import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useFonts } from "expo-font";
  import { Image } from "expo-image";
  import { blurHash, getRoomID, formatDate } from "../utils/common";
  import {
    doc,
    query,
    collection,
    orderBy,
    onSnapshot,
  } from "firebase/firestore";
  import { db } from "../firebaseConfig";

export default function GroupItem() {
  return (
    <View>
      <Text>GroupItem</Text>
    </View>
  )
}