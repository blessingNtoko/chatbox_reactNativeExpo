import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import HomeHeader from '../../../components/HomeHeader';

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen 
            name="Home"
            options={{
                header: () => {
                    return <HomeHeader />
                }
            }}
        />
    </Tabs>
  )
}
