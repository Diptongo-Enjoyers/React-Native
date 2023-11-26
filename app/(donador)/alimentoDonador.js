import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons"; // Choose appropriate icon set
import { FontAwesome } from "@expo/vector-icons";
import { Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function alimentoDonador() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState("");
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const submitDonation = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const response = await fetch(
      "https://api-three-kappa-45.vercel.app/donations/material",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          materials: items,
          receptionDate: selectedDate,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Donación exitosa");
      Alert.alert(
        "¡Donación exitosa!",
        "Gracias por tu donación, tu ayuda es muy importante para nosotros.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/noticiasDonador");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      console.error("Error procesando donación:", data);
      Alert.alert(
        "Error",
        "Hubo un error al procesar tu donación, por favor intenta de nuevo.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/noticiasDonador");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const addItem = () => {
    if (quantity.trim() && selectedFood) {
      const newItem = {
        key: Date.now().toString(), // Generate a unique key based on the current timestamp
        food: selectedFood,
        quantity,
      };
      setItems((currentItems) => [...currentItems, newItem]);
      setQuantity("");
      setSelectedFood(null);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.food} - {item.quantity} kg
      </Text>
      <TouchableOpacity
        onPress={() => deleteItem(item.key)}
        style={styles.deleteButton}
      >
        <FontAwesome name="trash" size={24} color="red"></FontAwesome>
      </TouchableOpacity>
    </View>
  );

  const deleteItem = (key) => {
    setItems((items) => items.filter((item) => item.key !== key));
  };

  const logItems = () => {
    console.log(items);
  };

  const showFinishModal = () => {
    setIsModalVisible(true);
  };

  const onDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setSelectedDate(currentDate);
  };

  const closeFinishModal = () => {
    
    // Check if the user has added any items to the list
    if (items.length === 0) {
      Alert.alert(
        "Error",
        "No has agregado ningún alimento a tu donación.",
        [
          {
            text: "OK",
            onPress: () => {
              setIsModalVisible(false);
            },
          },
        ],
        { cancelable: false }
      );
    } 
    // Check if the user has selected a date in the past
    else if (selectedDate < new Date()) {
      Alert.alert(
        "Error",
        "La fecha de entrega no puede ser en el pasado.",
        [
          {
            text: "OK",
            onPress: () => {
              setIsModalVisible(false);
            },
          },
        ],
        { cancelable: false }
      );
    }

    else {
      // Display a confirmation alert
      Alert.alert(
        "Confirmación", // Alert Title
        "¿Estás seguro que quieres acabar tu orden?", // Alert Message
        [
          {
            text: "Cancel",
            onPress: () => {
              setIsModalVisible(false);
            },
            // No action taken
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              setIsModalVisible(false);
              submitDonation();
              // Close the modal if OK is pressed
              // Add any additional actions you want to perform after confirmation
            },
          },
        ],
        { cancelable: false } // The alert cannot be dismissed by tapping outside of the alert box
      );
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container1}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeFinishModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={closeModal}
              style={styles.closeModalButton}
            >
              <FontAwesome name="close" size={24} color="#0093F2" />
            </TouchableOpacity>

            <Text style={styles.modalText}>Fecha de entrega</Text>
            {Platform.OS === "android" && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                style={styles.datePicker}
              />
            )}
            {/* For iOS, you might want to add a button to confirm the date selection */}
            {Platform.OS === "ios" && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={closeFinishModal}
            >
              <Text style={styles.buttonCloseText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => router.replace("/donacionDonador")}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={35} color="#0093F2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showFinishModal} style={styles.finish}>
          <Text style={styles.finishButton}> Finish </Text>
        </TouchableOpacity>

        {/* Add other header elements if needed */}
      </View>
      <View style={styles.container}>
        <DropDownPicker
          style={styles.pickerContainer}
          open={open}
          value={selectedFood}
          items={[
            { label: "Frutas", value: "Frutas" },
            { label: "Verduras", value: "Verduras" },
            { label: "Carnes", value: "Carnes" },
            // Más opciones...
          ]}
          setOpen={setOpen}
          setValue={setSelectedFood}
          setItems={setItems}
          placeholder="Selecciona un alimento"
          zIndex={30000} // Asegúrate de que el zIndex sea suficientemente alto
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Cantidad en kilos"
            value={quantity}
            onChangeText={(text) => {
              // Use a regular expression to allow only positive numbers
              const isValid = text.match(/^[1-9]\d*$/);
              // If the text is not empty and is a valid number, update the state
              if (text === "" || isValid) {
                setQuantity(text);
              }
            }}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={addItem} style={styles.button}>
            <Text style={styles.buttonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  pickerContainer: {
    marginEnd: 1,
    marginBottom: 100, // Ajusta este valor según sea necesario para dar espacio al menú desplegable
  },
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#e7e7e7",
    borderRadius: 5,
    flexDirection: "row", // Align children in a row
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
  },
  headerBar: {
    backgroundColor: "#fff",
    paddingTop: 10, // Adjust for status bar height if necessary
    paddingBottom: 40,
    paddingHorizontal: 10,
    // Add shadow or elevation if you want to give it depth
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    position: "absolute", // Position absolutely within the parent view             // Adjust top and left as needed for your layout
  },
  finish: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    position: "absolute", // Position absolutely within the parent view             // Adjust top and left as needed for your layout
    right: 10,
    top: 10,
  },
  finishButton: {
    color: "#0093F2",
    fontSize: 20,
  },
  deleteButton: {
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white", // This sets the actual background color of the modal content area
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    marginTop: 50,
    color: "#0093F2",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
    //bold
    fontWeight: "bold",
  },
  datePicker: {
    width: 200,
    height: 200,
  },
  closeModalButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonClose: {
    backgroundColor: "#0093F2",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonCloseText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
