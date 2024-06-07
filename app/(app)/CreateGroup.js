import {
  View,
  Text,
  TextInput,
  StatusBar,
  FlatList,
  Alert
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import { useAuth } from "../../context/authContext";
import { usersRef } from "../../firebaseConfig";
import { getDocs, query, where, setDoc, doc, Timestamp } from "firebase/firestore";
import { blurHash, getGroupID } from "../../utils/common";
import CreateGroupItem from "../../components/CreateGroupItem";
import GroupParticipants from "../../components/GroupParticipants";
import { useRouter } from "expo-router";
import CreateGroupHeader from "../../components/CreateGroupHeader";
import { db } from "../../firebaseConfig";

export default function CreateGroup() {
  const { user } = useAuth();
  const groupNameRef = useRef("");
  const [participants, setParticipants] = useState([
    {
      displayName: user?.displayName,
      userId: user?.userId,
    },
  ]);
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user?.userId) {
      getUsers();
    }
  }, []);

  async function getUsers() {
    // get users from firebase
    const q = query(usersRef, where("userId", "!=", user?.userId));

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

  function deleteParticipant(userId) {
    setParticipants(prev => {
        return prev.filter(el => el.userId !== userId);
    })
  }

  function setSelected(userObj) {
    setParticipants((prev) => {
      return [...prev, userObj];
    });
  }

  async function handleCreateGroup() {
    if (!groupNameRef.current) {
        Alert.alert("Create Group", "Please enter a group name.");
        return;
    }
    // handle create group
    await createGroupIfNotExists();
  }

  async function createGroupIfNotExists() {
    let groupID = getGroupID(groupNameRef.current, participants);
    await setDoc(doc(db, "groups", groupID), {
        participants: participants.map(el => el?.userId),
        groupName: groupNameRef.current,
        groupID,
        createdAt: Timestamp.fromDate(new Date())
    });
  }


  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <View className="flex-1 bg-white" style={{ paddingHorizontal: 20 }}>
      <StatusBar style="light" />
      <CreateGroupHeader router={router} handleCreateGroup={handleCreateGroup} numOfParticipants={participants.length}/>
      <View
        style={{
          height: hp(7),
          borderBottomColor: "#CDD1D0",
          marginTop: hp(3),
        }}
        className="flex py-3 border-b"
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
      {participants.length > 1 && (
        <GroupParticipants
          participants={participants}
          blurHash={blurHash}
          user={user}
          deleteParticipant={deleteParticipant}
        />
      )}

      <View className="flex-1">
        <FlatList
          data={contacts}
          contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
          keyExtractor={(item) => Math.random()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CreateGroupItem
              item={item}
              index={index}
              blurHash={blurHash}
              setSelected={setSelected}
            />
          )}
        />
      </View>
    </View>
  );
}
