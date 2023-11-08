import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  SwipeView,
  Animated,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabBarAdmin from "../../Components/BottomTabBarAdmin";
import { Modal, Button, FormControl, Input, VStack, HStack, Center, NativeBaseProvider, TextArea } from 'native-base';
import { Swipeable } from "react-native-gesture-handler";


export default function noticiasAdmin() {
  const [noticias, setNoticias] = useState([]);
  const selectedTab = "noticiasAdmin";
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [userToken, setUserToken] = useState("");

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}


  /*
    Recupera el token y las noticias
    Se utiliza AsyncStorage para almacenar el token con la funcion getItem y se guarda el token en la variable userToken
    Se utiliza la funcion fetch para obtener las noticias
    Se utiliza el token para poder acceder a las noticias
  */
  useEffect(() => {
    const fetchTokenAndData = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
      try {
        const response = await fetch(
          "https://api-three-kappa-45.vercel.app/news",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      }
    };

    fetchTokenAndData();
  }, []);

  /*
    Funcion para crear una nueva noticia
    Se utiliza el token para poder crear la noticia
    Se verifica que sea Admin desde el back
    Se utiliza la funcion fetch para crear la noticia
    Se utiliza el token para poder crear la noticia
  */
  const createNewArticle = async () => {
    try {
      const response = await fetch(
        "https://api-three-kappa-45.vercel.app/news/createNews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            title: titulo,
            body: descripcion,
            image: imagen,
            date: new Date(), // Asumiendo que quieres establecer la fecha actual.
          }),
        }
      );

      if (response.ok) {
        console.log("Noticia creada exitosamente");
        setModalVisible(false);
      } else {
        const data = await response.json();
        console.error("Error al crear la noticia:", data.message);
      }
    } catch (error) {
      console.error("Error al crear la noticia:", error);
    }
  };

  const deleteNews = async (newsId) => {
    const token = await AsyncStorage.getItem("userToken"); // Retrieve the stored token
    try {
      // Perform the DELETE request
      const response = await fetch(`https://api-three-kappa-45.vercel.app/news/${newsId}`, {
        method: 'DELETE', // Specify the method to use
        headers: {
          'Authorization': `Bearer ${token}`, // Use the token for authorization
          'Content-Type': 'application/json' // Set the content type
        },
      });
  
      if (response.ok) {
        // If the delete was successful
        const newNoticias = noticias.filter((item) => item._id !== newsId); // Remove the news item from state
        setNoticias(newNoticias); // Update the state with the new noticias array
        console.log('News deleted successfully');
      } else {
        // If there was an error with the request
        const errorData = await response.json(); // Optionally capture and log the error response from the server
        console.error('Failed to delete the news:', errorData);
      }
    } catch (error) {
      // If there was an error sending the request
      console.error('Error deleting news:', error);
    }
  };

  const rightSwipe = (progress, dragX, item) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={() => deleteNews(item._id)}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{ transform: [{ scale }] }}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={(progress, dragX) => rightSwipe(progress, dragX, item)}>
    <View style={styles.card}>
        <Link
          href={{
            pathname: "noticiasDetalle",
            params: {
              titulo: item.title,
              autor: item.author,
              descripcion: item.body,
              imagen: item.image,
            },
          }}
          asChild
        >
          <Pressable>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.titulo}>{item.title}</Text>
        <Text style={styles.descripcion}>{formatDate(item.date)}</Text>

          </Pressable>
        </Link> 
      </View>
    </Swipeable>
  );

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <FlatList
          data={noticias}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
          {/* Modal de native-base*/}
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size="full" animationPreset="slide">
            <Modal.Content maxWidth="100%" maxHeight="100%" flex={1}>
              <Modal.CloseButton />
              <Modal.Header>Create News</Modal.Header>
              <Modal.Body>
              <FormControl mb="5" isRequired>
                  <FormControl.Label style={{ fontSize: 40 }}>Título</FormControl.Label>
                  <Input 
                    value={titulo}
                    onChangeText={setTitulo}
                    />
                </FormControl>
                <FormControl mb="5" isRequired>
                  <FormControl.Label>Descripción</FormControl.Label>
                  <Input 
                  value={descripcion}
                  onChangeText={(text) => setDescripcion(text)}
                  />
                </FormControl>
                <FormControl mb="5" isRequired>
                  <FormControl.Label>URL de la Imagen</FormControl.Label>
                  <Input 
                    value={imagen}
                    onChangeText={setImagen}
                    style={styles.input}/>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button 
                  variant="outline" colorScheme="info" 
                  width={"50%"} onPress={() => {
                  setModalVisible(false);
                }}>
                    Cancel
                  </Button>
                  <Button 
                  variant="solid"
                  colorScheme="info"
                  width={"50%"}
                  onPress={() => {
                  createNewArticle();
                  setModalVisible(false);
                }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </TouchableOpacity >
        <BottomTabBarAdmin selectedTab={selectedTab} />
      </View>
    </NativeBaseProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#F0EDED",
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 8,
    padding: 16,
    elevation: 4,
  },
  image: {
    width: "100%",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#e91e63",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: 'absolute',
    bottom: 125,
    right: 16
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
});

