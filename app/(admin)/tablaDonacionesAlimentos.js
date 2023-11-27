import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function noticiasAdmin() {
  const selectedTab = "tablaDonacionesAlimentos";
  const router = useRouter();
  const [donations, setDonations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    try {
      const response = await fetch(
        "https://api-three-kappa-45.vercel.app/donations/material",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const donationsData = await response.json();

      const donationsWithUserNames = await Promise.all(donationsData.map(async (donation) => {
        const userResponse = await fetch(`https://api-three-kappa-45.vercel.app/users/${donation.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          console.error(`Error fetching user data for user ID: ${donation.userId}`);
          return {
            ...donation,
            userName: 'Unknown', // O manejar de otra manera
          };
        }

        const userData = await userResponse.json();
        return {
          id: donation._id,
          user: userData.name, // Asumiendo que el nombre está en la propiedad 'name'
          date: new Date(donation.creationDate).toLocaleDateString(),
          status: donation.status
        };
      }));

      setDonations(donationsWithUserNames);
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  const fetchDonationDetails = async (donationId) => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    try {
      const response = await fetch(
        `https://api-three-kappa-45.vercel.app/donations/material/${donationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const donationDetails = await response.json();
      setSelectedDonation(donationDetails);
    } catch (error) {
      console.error("Error fetching donation details:", error);
    }
  };

  const clearModal = () => {
    setSelectedDonation(null);
    setModalVisible(false);
  };

  const toggleModal = (donationId) => {
    if (!modalVisible && donationId) {
      fetchDonationDetails(donationId);
    }
    setModalVisible(!modalVisible);
  };

  const updateDonationStatus = async (donationId, newStatus) => {
    setLoading(true);
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }
  
    try {
      const updateData = {
        status: newStatus,
      };
  
      // Si la donación se aprueba, establece la fecha de recepción a la fecha actual
      if (newStatus === "Entregado") {
        updateData.receptionDate = new Date().toISOString();
      } else if (newStatus === "Pendiente") {
        // Establece la fecha de recepción a una fecha lejana
        updateData.receptionDate = "2099-12-31T00:00:00.000Z";
      }
  
      const response = await fetch(`https://api-three-kappa-45.vercel.app/donations/material/${donationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Actualiza la lista de donaciones tras el cambio de estado
      fetchData();
    } catch (error) {
      console.error("Error updating donation status:", error);
    }finally {
      setLoading(false);
    }
  };

  const approveDonation = (donationId) => {
    updateDonationStatus(donationId, "Entregado");
  };

  const revertDonation = (donationId) => {
    updateDonationStatus(donationId, "Pendiente");
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <TouchableOpacity style={styles.infoButton} onPress={() => toggleModal(item.id)}>
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
        <Button
          variant="outline"
          onPress={() => revertDonation(item.id)}
        >
          <Text style={styles.itemText}>Revertir a Pendiente</Text>
        </Button>
      )}
    </View>
  );

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading bold size="xl">
          Donaciones
        </Heading>
        <Divider my={2} />
        <FlatList
          data={donations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={clearModal}
        >
          <View style={styles.modalOuterView}>
            <View style={styles.modalView}>
              {selectedDonation && (
                <>
                  <Text style={styles.modalTitle}>Detalles de la Donación</Text>
                  {selectedDonation.materials.map((material, index) => (
                    <View key={index} style={styles.modalContent}>
                      <Text style={styles.modalText}>Alimento: {material.food}</Text>
                      <Text style={styles.modalText}>Cantidad: {material.quantity}</Text>
                    </View>
                  ))}
                  <Button onPress={clearModal} style={styles.closeButton}>
                    Cerrar
                  </Button>
                </>
              )}
            </View>
          </View>
        </Modal>
        <BottomTabBarAdmin selectedTab={selectedTab} />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="x-large" color="#FF0000" />
          </View>
        )}
      </View>
    </NativeBaseProvider>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 75, 
  },
  button: {
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
    backgroundColor: "transparent",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalOuterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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
    width: '80%', 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalContent: {
    alignItems: 'flex-start',
    width: '100%', 
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});