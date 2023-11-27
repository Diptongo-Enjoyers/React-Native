import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import BottomTabBarAdmin from "../../Components/BottomTabBarAdmin";
import {
  NativeBaseProvider,
  Divider,
  Text,
  Heading,
  Button,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function noticiasAdmin() {
  const selectedTab = "tablaDonacionesAlimentos";
  const router = useRouter();
  const [donations, setDonations] = useState([
    { id: "1", user: "User1", date: "2023-11-25", status: "Pendiente" },
    { id: "2", user: "User2", date: "2023-11-24", status: "Entregado" },
    { id: "3", user: "User3", date: "2023-11-25", status: "Pendiente" },
    { id: "4", user: "User4", date: "2023-11-24", status: "Entregado" },
    { id: "5", user: "User5", date: "2023-11-25", status: "Pendiente" },
    { id: "6", user: "User6", date: "2023-11-24", status: "Entregado" }, // ... more donation objects
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const jsonData = {
    _id: "655d0bda7b01846bfa86b435",
    userId: "654332d016208420e292d050",
    materials: [
      {
        food: "Frutas",
        key: "1700595857544",
        quantity: 1,
        _id: "655d0bda7b01846bfa86b436",
      },
      {
        food: "Frutas",
        key: "1700595860794",
        quantity: 2,
        _id: "655d0bda7b01846bfa86b437",
      },
      {
        food: "Carnes",
        key: "1700595863619",
        quantity: 3,
        _id: "655d0bda7b01846bfa86b438",
      },
    ],
    creationDate: "2023-11-21T19:58:18.463Z",
    receptionDate: "2023-11-21T00:00:00.000Z",
    status: "Pendiente",
    __v: 0,
  };

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    try {
      const response = await fetch(
        "https://api-three-kappa-45.vercel.app/usehttps://api-three-kappa-45.vercel.app/donations/materialrs/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      setDonations(data);
      //   setFilteredData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const approveDonation = (donationId) => {
    // Create a new array with the updated item
    const updatedDonations = donations.map((donation) => {
      if (donation.id === donationId) {
        return { ...donation, status: "Entregado" }; // Update the status of the matching donation
      }
      return donation; // Return the item unchanged if it does not match
    });

    setDonations(updatedDonations); // Set the new donations array as the current state
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <TouchableOpacity style={styles.infoButton} onPress={toggleModal}>
        <MaterialCommunityIcons name="information" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.user}</Text>
      <Text style={styles.itemText}>{item.date}</Text>
      {item.status === "Pendiente" ? (
        <Button
          variant="solid"
          backgroundColor="#e91e63"
          onPress={() => approveDonation(item.id)}
        >
          <Text style={styles.itemText}>Aprobar</Text>
        </Button>
      ) : (
        <Text style={styles.itemText}>{item.status}</Text>
      )}
    </View>
  );

  const jsonString = JSON.stringify(jsonData, null, 2);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading bold size="xl">
          Donaciones
        </Heading>
        <Divider my={2} />
        {/* <View style={styles.heading}>
          <Text style={styles.itemText}>Usuario</Text>
          <Text style={styles.itemText}>Fecha</Text>
          <Text style={styles.itemText}>Estado</Text>
        </View> */}
        <FlatList
          data={donations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.containerInfo}>
                {jsonData.materials.map((material, index) => (
                  <View key={index} >
                    <Text style={styles.modalText}>
                      Alimento: {material.food}
                    </Text>
                    <Text style={styles.modalText}>
                      Kilos: {material.quantity}
                    </Text>
                  </View>
                ))}
                <Text style={styles.modalText}>
                  Estatus: {jsonData.status}
                </Text>
              </View>
              <Button onPress={toggleModal} backgroundColor={"#e91e63"}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
        <BottomTabBarAdmin selectedTab={selectedTab} />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  cellStyle: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  itemRow: {
    backgroundColor: "#F0EDED",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 75, // Fixed height for all rows

    // Add more styles for the row as needed
  },
  itemText: {
    // Style for the text components
  },
  button: {
    // Style for the TouchableOpacity
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    colorScheme: "info",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  infoButton: {
    //no background color
    backgroundColor: "transparent",
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
  modalText: {
    marginBottom: 0,
    textAlign: "center",
    marginVertical: 8,
  },
    containerInfo: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    },

});
