import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabBar from '../../Components/BottomTabBar';

export default function noticiasBenef() {
    const [noticias, setNoticias] = useState([]);
    const selectedTab = 'noticiasBenef';
    const router = useRouter();

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                // Recupera el token
                const userToken = await AsyncStorage.getItem('userToken');
                
                const response = await fetch('https://api-three-kappa-45.vercel.app/news', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                
                const data = await response.json();
                setNoticias(data);
            } catch (error) {
                console.error("Error al obtener las noticias:", error);
            }
        };

        fetchNoticias();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Link href={{
                pathname: "noticiasDetalle",
                params: {
                    titulo: item.title,
                    autor: item.author,
                    descripcion: item.body,
                    imagen: item.image
                }
            }} asChild>
                <Pressable>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </Pressable>
            </Link>
            <Text style={styles.titulo}>{item.title}</Text>
            <Text style={styles.descripcion}>{item.author}</Text>
            <Text style={styles.descripcion}>{item.body}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={noticias}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
            <BottomTabBar selectedTab={selectedTab} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 8,
        padding: 16,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    descripcion: {
        fontSize: 16,
        marginBottom: 8,
    },
});
