import { View, FlatList } from 'react-native';
import React from 'react';
import GroupItem from './GroupItem';
import { useRouter } from "expo-router";

export default function GroupList({ groups, currentUser }) {
  const router = useRouter();

  return (
    <View className="flex-1">
    <FlatList
      data={groups}
      contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
      keyExtractor={(item) => Math.random()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <GroupItem itemData={item} index={index} router={router} currentUser={currentUser} />
      )}
    />
  </View>
  )
}