import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments, Stack } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { MenuProvider } from "react-native-popup-menu";

// import { useRoute } from '@react-navigation/native';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;

    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      // if user is authenticated, redirect to home
      router.replace("(tabs)/Home");
    } else if (isAuthenticated === false) {
      //if user isn't authenticated or logged out, redirect to onBoarding
      router.replace("onBoarding");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
    // <View className="flex-1">
    // </View>
  );
}
