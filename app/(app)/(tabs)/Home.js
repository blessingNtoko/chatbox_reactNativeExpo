import { View, StatusBar, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../../components/ChatList";
import Loading from "../../../components/Loading";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, usersRef } from "../../../firebaseConfig";
import { getRoomID } from "../../../utils/common";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      getUsers();
    }
  }, []);

  async function getUsers() {
    // get users from firebase
    setLoading(true);
    const q = query(usersRef, where("userId", "!=", user?.userId));

    try {
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(...doc.data());
      });

      getChats(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getChats(data) {
    // get users with messages sent
    if (data.length === 0) {
      setLoading(false);
      return;
    }

    const chatArr = [];

    data.forEach((contact) => {
      let roomID = getRoomID(user?.userId, contact?.userId);
      const docRef = doc(db, "rooms", roomID);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef);

      try {
        let unsub = onSnapshot(q, (snapshot) => {
          let allMessages = snapshot.docs.map((doc) => {
            return doc.data();
          });

          if (allMessages.length > 0) {
            if (!chatArr.some((obj) => obj?.userId === contact?.userId)) {
              chatArr.push(contact);
            }
          }

          setChats((prev) => {
            return [...chatArr];
          });

          setLoading(false);
        });

        return unsub;
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <View className="flex-1 bg-white px-5">
      <StatusBar style="light" />
      {loading ? (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      ) : chats.length > 0 ? (
        <ChatList users={chats} currentUser={user} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Ionicons name="chatbubbles" size={hp(20)} color="lightgrey" />
          <Text style={{ fontSize: hp(2.5) }}>
            You don't seem to have any chats.
          </Text>
          <Text>Why don't you say hi to someone.</Text>
        </View>
      )}
    </View>
  );
}
