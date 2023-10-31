import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen name="noticiasBenef" options={{
            headerTitle: "Noticias",
            headerTitleAlign: "center",
            tabBarLabel: "Noticias"
        }}/>
        <Tabs.Screen name="perfilBenef" options={{
            headerTitle: "Perfil",
            headerTitleAlign: "center",
            tabBarLabel: "Perfil"
        }}/>
    </Tabs>
  )
}