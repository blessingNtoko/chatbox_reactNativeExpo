import { View, Text, StatusBar, TouchableOpacity, Alert } from "react-native";
import React from "react";
import ProfileHeader from "../../components/ProfileHeader";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurHash } from "../../utils/common";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import ProfileItem from "../../components/ProfileItem";
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function Profile() {
  const {
    user,
    updateUser,
    updateUserEmail,
    updateUserPhoneNumber,
    updateStatus,
  } = useAuth();
  const router = useRouter();

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateUser(user?.displayName, result.assets[0].uri);
    }
  }

  async function handleUserUpdate(displayName, photoURL = "") {
    try {
      await updateUser(displayName, photoURL);
      Alert.alert("Update Profile", "Profile has been updated");
    } catch (error) {
      Alert.alert("Profile Update", "Profile update failed");
    }
  }

  async function handleEmailUpdate(email) {
    try {
      await updateUserEmail(email);
      Alert.alert("Update Email", "Email has been updated");
    } catch (error) {
      Alert.alert("Email Update", "Email update failed");
    }
  }

  async function handlePhoneNumberUpdate(phoneNumber) {
    try {
      await updateUserPhoneNumber(phoneNumber);
      Alert.alert("Update Phone Number", "Phone Number has been updated");
    } catch (error) {
      Alert.alert("Phone Number Update", "Phone Number update failed");
    }
  }

  async function handleStatusUpdate(status) {
    try {
      await updateStatus(status);
      Alert.alert("Update Status", "Status has been updated");
    } catch (error) {}
  }


  return (
    <CustomKeyboardView>
      <View
        style={{ backgroundColor: "#000E08" }}
        className="flex-1 justify-center"
      >
        <StatusBar barStyle="dark-content" />
        <ProfileHeader router={router} />

        <View
          className="flex-1"
          style={{
            justifyContent: "space-between",
            backgroundColor: "#000E08",
          }}
        >
          <View className="flex justify-center items-center">
            <TouchableOpacity
              onPress={pickImage}
              style={{ alignItems: "center", justifyContent: "center" }}
              className="flex-row"
            >
              <Image
                style={{
                  height: hp(17),
                  aspectRatio: 1,
                  borderRadius: 100,
                  marginLeft: wp(7),
                }}
                source={
                  user?.photoURL
                    ? user?.photoURL
                    : "https://picsum.photos/seed/696/3000/2000"
                }
                placeholder={{ blurHash }}
                contentFit="cover"
                transition={500}
              />
              <Feather
                name="edit-2"
                size={hp(4)}
                color="white"
                style={{ alignSelf: "flex-end" }}
              />
            </TouchableOpacity>
            <View className="pt-5">
              <Text style={{ color: "white", fontSize: hp(4) }}>
                {user?.displayName}
              </Text>
            </View>
            <View className="pt-3">
              <Text style={{ color: "#797c7b", fontSize: hp(2) }}>
                @
                {user?.displayName
                  ? user?.displayName.replace(/\s+/g, "").toLowerCase()
                  : ""}
              </Text>
            </View>
            <View
              className="flex flex-row items-center pt-5 pb-5"
              style={{ justifyContent: "space-between", width: wp(75) }}
            >
              <TouchableOpacity
                style={{ borderRadius: 999, backgroundColor: "#051D13" }}
              >
                <AntDesign
                  name="message1"
                  size={hp(4)}
                  color="white"
                  style={{ padding: 12 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderRadius: 999, backgroundColor: "#051D13" }}
              >
                <Feather
                  name="video"
                  size={hp(4)}
                  color="white"
                  style={{ padding: 12 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderRadius: 999, backgroundColor: "#051D13" }}
              >
                <Feather
                  name="phone"
                  size={hp(4)}
                  color="white"
                  style={{ padding: 12 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderRadius: 999, backgroundColor: "#051D13" }}
              >
                <SimpleLineIcons
                  name="options"
                  size={hp(4)}
                  color="white"
                  style={{ padding: 12 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            className="flex bg-white rounded-t-lg"
            style={{
              height: hp(53),
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <ProfileItem
              title="Display Name"
              details={user?.displayName}
              handleUpdate={handleUserUpdate}
            />
            <ProfileItem
              title="Email Address"
              details={user?.email}
              handleUpdate={handleEmailUpdate}
            />
            <ProfileItem
              title="Status"
              details={user?.status}
              profileProperty="status"
              handleUpdate={handleStatusUpdate}
            />
            <ProfileItem
              title="Phone Number"
              details={user?.phoneNumber ? user?.phoneNumber : "000-000-0000"}
              handleUpdate={handlePhoneNumberUpdate}
            />
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
