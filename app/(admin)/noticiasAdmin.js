import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabBarAdmin from '../../Components/BottomTabBarAdmin';

export default function noticiasAdmin() {
    const [noticias, setNoticias] = useState([]);
    const selectedTab = 'noticiasAdmin';
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');

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

            <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />
            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder="Título"
                            value={titulo}
                            onChangeText={setTitulo}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Descripción"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="URL de la Imagen"
                            value={imagen}
                            onChangeText={setImagen}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                
                                setModalVisible(false);
                            }}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setTitulo('');
                                setDescripcion('');
                                setImagen('');
                                setModalVisible(false);
                            }}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <FlatList
                data={noticias}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
            <BottomTabBarAdmin selectedTab={selectedTab} />
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 200,
        padding: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
});
