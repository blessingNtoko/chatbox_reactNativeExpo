import { View, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from "../../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from '../../../components/ChatList';
import Loading from '../../../components/Loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../../firebaseConfig';

export default function Home() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  console.log("user Data :: ", user)

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  async function getUsers() {
    // get users from firebase
    const q = query(usersRef, where("userId", "!=", user?.uid));

    try {      
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({...doc.data()});
      });
  
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View className="flex-1 bg-white px-5">
      <StatusBar style="light"/>
      {
        users.length > 0 ? (
          <ChatList users={users} currentUser={user} />
        ) : (
          <View className="flex items-center" style={{top: hp(30)}}>
            <Loading size={hp(10)} />
          </View>
        )
      }
    </View>
  )
}