import { View, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { useRouter } from "expo-router";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../../context/authContext";
import GroupList from "../../../components/GroupList";
import Loading from "../../../components/Loading";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";

export default function Groups() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const groupsRef = collection(db, "groups");

  useEffect(() => {
    if (user?.userId) {
      getGroups();
    }
  }, []);

  function handlePress() {
    router.push({ pathname: "/CreateGroup" });
  }

  async function getGroups() {
    setLoading(true);
    console.log("Groups | user", user)

    const q = query(
      groupsRef,
      where("participants", "array-contains", user?.userId)
    );

    console.log("called get groups", query);

    try {
      const querySnapshot = await getDocs(q);
      console.log("Groups | getGroups() | querySnapshot :: ", querySnapshot);
      let data = [];
      querySnapshot.forEach((doc) => {
        console.log("querySnaphot | doc", doc.data());
        data.push(doc.data());
      });

      for (let i = 0; i < querySnapshot.length; i++) {}

      setGroups(data);
      setLoading(false);
      console.log("Groups | getGroups() | data :: ", data);
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log("groups.length ", groups.length);

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
