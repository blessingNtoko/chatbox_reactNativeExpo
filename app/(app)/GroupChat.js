import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { useRouter } from "expo-router";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import {
  Timestamp,
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import GroupChatHeader from "../../components/GroupChatHeader";

export default function GroupChat() {
  const item = useLocalSearchParams(); // second user
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const docRef = doc(db, "groups", item.groupID);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapShot) => {
      let allMessages = snapShot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      unsub;
      KeyboardDidShowListener.remove();
    };
  }, []);

  async function handleSendMessage() {
    let message = textRef.current.trim();

    if (!message) return;

    try {
      //get reference to document that was created when room was created
      const docRef = doc(db, "groups", item.groupID);
      // create messages collection for document
      const messagesRef = collection(docRef, "messages");

      // clear text from input
      textRef.current = "";
      if (inputRef) inputRef?.current.clear();

      //add document to colection
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        photoURL: user?.photoURL,
        senderName: user?.displayName,
        createdAt: Timestamp.fromDate(new Date()),
      });

    } catch (error) {
      Alert.alert("Message", error.message);
    }
  }

  useEffect(() => {
    updateScrollView();
  }, [messages])

  function updateScrollView() {
    setTimeout(() => {
        scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 100)
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <GroupChatHeader group={item} router={router} />
      <View
        style={{
          justifyContent: "space-between",
          overflow: "visible",
          backgroundColor: "rgb(245, 245, 245)",
        }}
        className="flex-1"
      >
        <View className="flex-1">
          <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
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
              <View>
                <TextInput
                  ref={inputRef}
                  placeholder="Write your message"
                  style={{ borderRadius: 100, color: "#797c7b", width: wp(50) }}
                  onChangeText={(value) => (textRef.current = value)}
                />
              </View>
              <TouchableOpacity
                style={{ padding: 2, marginRight: 2, borderRadius: 100 }}
                onPress={handleSendMessage}
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
