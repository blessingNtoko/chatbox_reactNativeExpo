import { View, Text, TouchableHighlight } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { Image } from "expo-image";

export default function CreateGroupItem({ item, blurHash, setSelected }) {
  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        setSelected(item?.userId);
      }}
      style={{marginBottom: hp(1)}}
    >
      <View className="flex-row items-center gap-1">
        <Image
          style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
          source={
            item?.photoURL
              ? item?.photoURL
              : "https://picsum.photos/seed/696/3000/2000"
          }
          placeholder={{ blurHash }}
          contentFit="cover"
          transition={500}
        />
        <View className="flex-1 gap-1">
          <View
            style={{ justifyContent: "space-between" }}
            className="flex-row"
          >
            <Text
              style={{
                fontSize: hp(2),
                fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif",
                color: "black",
              }}
              className="font-semibold"
            >
              {item?.displayName}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
