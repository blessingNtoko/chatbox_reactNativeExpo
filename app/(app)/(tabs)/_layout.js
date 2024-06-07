import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import HomeHeader from '../../../components/HomeHeader';
import TabBar from '../../../components/TabBar';
import { useRouter } from 'expo-router';

export default function _layout() {
    const router = useRouter();
  return (
    <Tabs tabBar={props => <TabBar {...props}/>}>
        <Tabs.Screen 
            name="Home"
            options={{
                header: () => {
                    return <HomeHeader title="Messages" />
                },
                title: "Messages"
            }}
        />
        <Tabs.Screen 
            name="Contacts"
            options={{
                header: () => {
                    return <HomeHeader title="Contacts" />
                },
                title: "Contacts"
            }}
        />
        <Tabs.Screen 
            name="Groups"
            options={{
                header: () => {
                    return <HomeHeader  title="Groups" router={router}/>
                },
                title: "Groups"
            }}
        />
    </Tabs>
  )
}
