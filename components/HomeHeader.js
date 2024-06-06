import {
  View,
  Text,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurHash } from "../utils/common";
import { useAuth } from "../context/authContext";
import { useFonts } from "expo-font";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItems";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";

const ios = Platform.OS == "ios";

export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const [fontsloaded] = useFonts({
    "Poppins-Regular": require("./../assets/fonts/Poppins-Regular.ttf"),
  });

  function handleProfile() {
    // handle profile
  }

  async function handleLogout() {
    // handle logout
    await logout();
  }

  return (
    <View
      style={{
        paddingTop: ios ? top : top + 10,
        backgroundColor: "#000E08",
        height: hp(13),
        justifyContent: "space-between",
      }}
      className="flex flex-row items-center px-5 pb-6"
    >
      <View>
        <AntDesign name="search1" size={hp(3)} color="#fff" />
      </View>
      <View>
        <Text
          style={{ fontSize: hp(3), fontFamily: fontsloaded && "Poppins-Regular" }}
          className="font-medium text-white"
        >
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(5), aspectRatio: 1, borderRadius: 100 }}
              source={
                user?.profileImg
                  ? user?.profileImg
                  : "https://picsum.photos/seed/696/3000/2000"
              }
              placeholder={{ blurHash }}
              contentFit="cover"
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(3)} color="#fff" />}
            />

            <Divider />

            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={<MaterialIcons name="logout" size={hp(3)} color="#fff" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200" />;
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#24786D",
    padding: 5,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: -30
  },
  optionsWrapper: {
    backgroundColor: "#24786D",
  },
  optionWrapper: {
    backgroundColor: "#24786D",
    margin: 5,
  },
  optionTouchable: {
    underlayColor: "#24786D",
    activeOpacity: 70,
  },
  optionText: {
    color: "white",
  },
};
