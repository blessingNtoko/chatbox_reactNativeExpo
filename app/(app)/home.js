import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from "../../context/authContext";
import Button from '../../components/Button';

export default function Home() {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    // handle logout
  }
  return (
    <View>
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