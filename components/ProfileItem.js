import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

export default function ProfileItem({ title, details, handleUpdate }) {
  const [isEditable, setIsEditable] = useState(false);
  const textRef = useRef("")
  return (
    <View
      className="flex-row items-center"
      style={{ justifyContent: "space-between", marginHorizontal: 30 }}
    >
      <View
        className="flex"
        style={{
          justifyContent: "flex-start",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: hp(1.7), color: "#737373" }}>{title}</Text>
        <TextInput
          style={{ fontSize: hp(3), padding: 3, color: "#000", width: wp(70), backgroundColor: isEditable ? "#f3f6f6" : "#fff", borderRadius: 10 }}
          editable={isEditable}
          onChangeText={value => textRef.current = value}
        >
          {details}
        </TextInput>
      </View>
      {isEditable ? (
        <TouchableOpacity onPress={() => {
            setIsEditable(!isEditable);
            handleUpdate(textRef.current)
        }}>
          <Feather name="save" size={hp(4)} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsEditable(!isEditable)}>
          <Feather name="edit-2" size={hp(4)} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}
