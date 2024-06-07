import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../../components/ChatList";
import Loading from "../../../components/Loading";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../../firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

export default function Contacts() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [users, setUsers] = useState([]);


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



      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <View className="flex-1 bg-white px-5">
      <StatusBar style="light" />
      {
        loading ? (
          <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
        ) : users.length > 0 ? (
          <ChatList users={users} currentUser={user} />
        ) : (
          <View className="flex items-center" style={{ top: hp(30) }}>
          <MaterialIcons name="contacts" size={hp(20)} color="lightgrey" />
          <Text style={{fontSize: hp(2.5)}}>You don't seem to have any contacts.</Text>
          <Text>Don't worry, others will join you soon.</Text>
        </View>
        )
      }
    </View>
  );
}
