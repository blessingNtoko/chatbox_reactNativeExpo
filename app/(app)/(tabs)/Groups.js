import { View, Text } from 'react-native';
import React from 'react';
import Button from "../../../components/Button";
import { useRouter } from "expo-router";


export default function Groups() {
  const router = useRouter();

  function handlePress() {
    router.push({ pathname: "/CreateGroup" });
  }

  return (
    <View>
      <Button handlePress={handlePress} btnColor="#24786D" btnText="Create Group" txtColor="white"/>
    </View>
  )
}