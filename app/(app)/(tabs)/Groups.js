import { View, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../../context/authContext";
import GroupList from "../../../components/GroupList";
import Loading from "../../../components/Loading";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";

export default function Groups() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const groupsRef = collection(db, "groups");

  useEffect(() => {
    if (user?.userId) {
      getGroups();
    }
  }, []);

  async function getGroups() {
    setLoading(true);

    const q = query(
      groupsRef,
      where("participants", "array-contains", user?.userId)
    );

    try {
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      for (let i = 0; i < querySnapshot.length; i++) {}

      setGroups(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <View className="flex-1 bg-white px-5">
      <StatusBar style="light" />
      {loading ? (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      ) : groups.length > 0 ? (
        <GroupList groups={groups} currentUser={user} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <MaterialIcons name="groups" size={hp(20)} color="lightgrey" />
          <Text style={{ fontSize: hp(2.5) }}>
            You don't seem to have any groups.
          </Text>
          <Text>Why don't you create some.</Text>
        </View>
      )}
    </View>
  );
}
