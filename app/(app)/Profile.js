import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Touchable,
  Alert,
} from "react-native";
import React, { useState } from "react";
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
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import ProfileItem from "../../components/ProfileItem";

export default function Profile() {
  const { user, updateUser, updateEmail, updatePhoneNumber } = useAuth();
  const router = useRouter();
  const [pickedImage, setPickedImage] = useState(null);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      storage();
    }
  }

  // function storage() {
  //   const storage = getStorage();
  //   const profileImgRef = ref(storage, pickedImage?.assets[0].uri);

  //   uploadBytes(profileImgRef, pickedImage?.assets[0].uri).then((snapshot) => {
  //     console.log("uploaded file");
  //     console.log("snapshot :: ", snapshot);
  //   });
  // }

  async function handleUserUpdate(displayName, photoURL = "") {
    try {
       await updateUser(displayName, photoURL);
        Alert.alert("Update Profile", "Profile has been updated");
    } catch (error) {
      console.log("Update Error::", error);
      Alert.alert("Profile Update", "Profile update failed");
    }
  }

  async function handleEmailUpdate(email) {
    try {
       await updateEmail(email);
        Alert.alert("Update Email", "Email has been updated");
    } catch (error) {
      console.log("Update Error::", error);
      Alert.alert("Email Update", "Email update failed");
    }
  }

  return (
    <View
      style={{ backgroundColor: "#000E08" }}
      className="flex-1 justify-center"
    >
      <StatusBar barStyle="dark-content" />
      <ProfileHeader router={router} />

      <View
        className="flex-1"
        style={{ justifyContent: "space-between", backgroundColor: "#000E08" }}
      >
        <View className="flex justify-center items-center">
          <TouchableOpacity
            onPress={pickImage}
            style={{ alignItems: "center", justifyContent: "center" }}
            className="flex"
          >
            <Image
              style={{ height: hp(17), aspectRatio: 1, borderRadius: 100 }}
              source={
                user?.profileImg
                  ? user?.profileImg
                  : "https://picsum.photos/seed/696/3000/2000"
              }
              placeholder={{ blurHash }}
              contentFit="cover"
              transition={500}
            />
          </TouchableOpacity>
          <View className="pt-5">
            <Text style={{ color: "white", fontSize: hp(4) }}>
              {user?.displayName}
            </Text>
          </View>
          <View className="pt-3">
            <Text style={{ color: "#797c7b", fontSize: hp(2) }}>
              @{user?.displayName.replace(/\s+/g, "").toLowerCase()}
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
          <ProfileItem title="Display Name" details={user?.displayName} profileProperty="displayName" handleUpdate={handleUserUpdate}/>
          <ProfileItem title="Email Address" details={user?.email} profileProperty="email" handleUpdate={handleEmailUpdate} />
          {/* <ProfileItem title="Status" details={user?.status} profileProperty="status" handleUpdate={handleUpdate} /> */}
          <ProfileItem title="Phone Number" details={user?.phoneNumber ? user?.phoneNumber : "000-000-0000"} profileProperty="phoneNumber" handleUpdate={updatePhoneNumber} />
        </View>
      </View>
    </View>
  );
}
