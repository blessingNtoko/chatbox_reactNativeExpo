import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MessageItem({ message, currentUser }) {
  // console.log("MessageItem | currentUser", currentUser);
  // console.log("MessageItem | message", message);
  if (currentUser?.uid == message?.userId) {
    // my message
    return (
      <View
        style={{ justifyContent: "flex-end", marginBottom: 6, marginRight: 3 }}
        className="flex-row"
      >
        <View style={{ width: wp(80) }}>
          <View
            style={{ backgroundColor: "#20A090" }}
            className="flex self-end p-3 bg-white mr-5 rounded-b-xl rounded-l-xl"
          >
            <Text style={{ color: "#fff" }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    // their message
    return (
      <View
        style={{ justifyContent: "flex-start", marginBottom: 6, marginLeft: 3 }}
        className="flex-row"
      >
        <View style={{ width: wp(80) }}>
          <View
            style={{ backgroundColor: "#FFF" }}
            className="flex self-start p-3 bg-white ml-5 rounded-b-xl rounded-r-xl"
          >
            <Text style={{ color: "#000" }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}
