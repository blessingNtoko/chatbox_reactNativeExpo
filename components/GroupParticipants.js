import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function GroupParticipants({ user, participants, blurHash, deleteParticipant }) {
  return (
    <View
      className="flex-row flex-wrap items-center pt-5 border-b"
      style={{ borderBottomColor: "#CDD1D0" }}
    >
      {participants
        .filter((el) => user?.userId !== el.userId)
        .map((participant, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex justify-center items-center"
              style={{marginHorizontal: 5}}
              onPress={() => {
                deleteParticipant(participant?.userId);
              }}
            >
              <Image
                style={{ height: hp(4), aspectRatio: 1, borderRadius: 100 }}
                source={
                  participant?.photoURL
                    ? participant?.photoURL
                    : "https://picsum.photos/seed/696/3000/2000"
                }
                placeholder={{ blurHash }}
                contentFit="cover"
                transition={500}
              />
              <Text style={{ fontSize: hp(1), color: "black" }}>
                {participant.displayName.split(" ")[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}
