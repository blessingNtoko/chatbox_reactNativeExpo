import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
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

export default function ChatItem({ itemData, router, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    const roomId = getRoomID(currentUser?.userId, itemData?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapShot) => {
      let allMessages = snapShot.docs.map((doc) => {
        return doc.data();
      });

      setLastMessage([allMessages[0] ? allMessages[0] : null]);
    });

    return unsub;
  }, []);

  console.log("last message :: ", lastMessage);

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
    router.push({ pathname: "/ChatRoom", params: itemData });
  }

  function renderTime() {
    // render time
    if (lastMessage) {
        const date = lastMessage[0]?.createdAt;
        return date && formatDate(new Date(date?.seconds * 1000));
    }
  }

  function renderLastMessage() {
    // render last message
    if (typeof lastMessage === "undefined") return "Loading...";

    if(lastMessage[0]) {
        if (currentUser?.userId === lastMessage[0]?.userId) return `You: ${lastMessage[0]?.text}`;
        return lastMessage[0]?.text;
    } else {
        return "Say Hi 👋🏾"
    }
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
            {
                renderTime()
            }
          </Text>
        </View>
        <Text
          style={{
            fontSize: hp(1.4),
            fontFamily: styles.textFont.fontFamily,
          }}
          className="font-medium"
        >
          {
            renderLastMessage()
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
}
