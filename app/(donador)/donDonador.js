import { View, Text } from 'react-native'
import React from 'react'
import BottomTabBarDonador from "../../Components/BottomTabBarDonador";

export default function donDonador() {
    const selectedTab = "donDonador";
    return (
        <View>
            <Text>donDonador</Text>
            <BottomTabBarDonador selectedTab={selectedTab} />
        </View>
    )
}