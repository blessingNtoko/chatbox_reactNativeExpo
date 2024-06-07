import { View, StatusBar, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import {
  widthPercentageToDP as wp,
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
  // const [allRooms, setAllRooms] = useState([]);

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
        data.push({ ...doc.data() });
      });

        console.log("data data", data)

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

    console.log("Get chats called");
    const chatArr = [];

    data.forEach((contact) => {
      console.log("in for each");
      let roomID = getRoomID(user?.userId, contact?.userId);
      const docRef = doc(db, "rooms", roomID);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef);

      try {
        let unsub = onSnapshot(q, (snapshot) => {
          let allMessages = snapshot.docs.map((doc) => {
            return doc.data();
          });

          // console.log("Home | getChats() | allMessages :: ", allMessages, roomID);
          if (allMessages.length > 0) {
            // console.log("Home | getChats | contact :: ", contact);
            if (!chatArr.some((obj) => obj?.userId === contact?.userId)) {
              chatArr.push(contact);
            }
          }


          setChats((prev) => {
            return [...chatArr];
          });

          setLoading(false);
        });
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
          <Text style={{fontSize: hp(2.5)}}>You don't seem to have any chats.</Text>
          <Text>Why don't you say hi to someone.</Text>
        </View>
      )
    }

    {/* {chats.length > 0 ? (
      <ChatList users={chats} currentUser={user} />
    ) : (
      <View className="flex items-center" style={{ top: hp(30) }}>
        <Loading size={hp(10)} />
      </View>
    )} */}
    </View>
  );
}
