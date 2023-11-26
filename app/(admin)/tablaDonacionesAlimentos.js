import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BottomTabBarAdmin from "../../Components/BottomTabBarAdmin";



export default function noticiasAdmin() {

    const selectedTab = "tablaDonacionesAlimentos";
    const router = useRouter();
    const donations = [
        { id: '1', user: 'User1', date: '2023-11-25' },
        { id: '2', user: 'User2', date: '2023-11-24' },
        // ... more donation objects
    ];
    
    const renderItem = ({ item }) => (
        <View style={styles.item}>
        <Text style={styles.title}>User: {item.user}</Text>
        <Text>Date: {item.date}</Text>
        {/* Add more donation details here */}
        </View>
    );

    return (
        <View style={styles.container}>
        
        <FlatList
            data={donations}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        <BottomTabBarAdmin selectedTab={selectedTab} />

        </View>
    );
    };


const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: 20,
},
item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
},
title: {
    fontSize: 18,
},
});

