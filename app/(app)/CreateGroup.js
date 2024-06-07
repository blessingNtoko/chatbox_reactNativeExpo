import { View, Text, TextInput, StatusBar, FlatList, TouchableHighlight } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { useAuth } from "../../context/authContext";
import { usersRef } from "../../firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import { blurHash } from "../../utils/common";
import CreateGroupItem from "../../components/CreateGroupItem";


export default function CreateGroup() {
  const { user } = useAuth();
  const groupNameRef = useRef("");
  const [participants, setParticipants] = useState([user?.uid]);
  const [contacts, setContacts] = useState([]);

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
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });

      setContacts(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function setSelected(userId) {
    setParticipants(prev => {
        return [...prev, userId];
    })
  }

  console.log("CreateGroup | contacts :: ", contacts);

  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <View className="flex-1 bg-white" style={{ paddingHorizontal: 20 }}>
      <StatusBar style="light" />
      <View
        style={{
          height: hp(7),
          borderBottomColor: "#CDD1D0",
          marginTop: hp(3),
        }}
        className="flex py-3 border-b gap-5"
      >
        <Text
          className="font-medium text-sm/[14px]"
          style={{
            color: "#24786D",
            fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif",
          }}
        >
          Group Name
        </Text>
        <TextInput
          style={{ fontFamily: fontsloaded ? "Poppins-Regular" : "sans-serif" }}
          className="flex-1 font-semibold text-neutral-600"
          onChangeText={(value) => (groupNameRef.current = value)}
        />
      </View>

      <View className="flex-1">
        <FlatList
          data={contacts}
          contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
          keyExtractor={(item) => Math.random()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CreateGroupItem item={item} index={index} blurHash={blurHash} setSelected={setSelected} />
          )}
        />
      </View>
    </View>
  );
}
