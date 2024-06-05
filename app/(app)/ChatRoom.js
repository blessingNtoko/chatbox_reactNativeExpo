import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { useRouter } from "expo-router";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  console.log("got item data :: ", item);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View
        style={{
          justifyContent: "space-between",
          overflow: "visible",
          backgroundColor: "rgb(245, 245, 245)",
        }}
        className="flex-1"
      >
        <View className="flex-1">
          <MessageList messages={messages} />
        </View>
        <View
          style={{
            marginBottom: hp(0),
            paddingTop: 2,
            height: hp(12),
            backgroundColor: "white",
          }}
          className="flex justify-center"
        >
          <View
            style={{ justifyContent: "space-between", marginHorizontal: wp(5) }}
            className="flex-row items-center gap-5"
          >
            <View className="flex-row gap-5 items-center">
              <TouchableOpacity>
                <Entypo name="attachment" size={hp(3)} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                padding: 2,
                backgroundColor: "#f3f6f6",
                paddingLeft: 5,
                marginRight: 2,
                fontSize: hp(3),
                width: wp(60),
                height: hp(6),
              }}
              className="flex-row rounded-2xl items-center"
            >
              <TextInput
                placeholder="Write your message"
                style={{ borderRadius: 100, color: "#797c7b" }}
              />
              <TouchableOpacity
                style={{ padding: 2, marginRight: 2, borderRadius: 100 }}
              >
                <Feather name="send" size={hp(3)} color="black" />
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-5 items-center">
              <TouchableOpacity>
                <Feather name="camera" size={hp(3)} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="mic" size={hp(3)} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
