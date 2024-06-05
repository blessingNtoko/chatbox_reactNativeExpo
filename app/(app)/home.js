import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from "../../context/authContext";
import Button from '../../components/Button';

export default function Home() {
  const { logout, user } = useAuth();

  async function handleLogout() {
    await logout();
    // handle logout
  }

  console.log("user data :: ", user);
  return (
    <View className="flex-1 bg-white">
      <Text>Home</Text>
      <Button 
        btnColor="#24786D"
        btnText="Sign Out"
        txtColor="white"
        handlePress={handleLogout}
      />
    </View>
  )
}