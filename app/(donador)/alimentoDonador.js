import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons'; // Choose appropriate icon set



export default function alimentoDonador() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [quantity, setQuantity] = useState('');
    const router = useRouter();    

  
    const addItem = () => {
      if (quantity.trim() && selectedFood) {
        setItems([...items, { key: `${items.length}`, food: selectedFood, quantity }]);
        setQuantity('');
        setSelectedFood(null);
      }
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.food} - {item.quantity} kg</Text>
      </View>
    );
  
    return (
        <View style={styles.container1}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => router.replace("/donacionDonador")} style={styles.backButton}>
                    <Icon name="arrow-back" size={35} color="#0093F2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.finish}>
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
                { label: 'Frutas', value: 'Frutas' },
                { label: 'Verduras', value: 'Verduras' },
                { label: 'Carnes', value: 'Carnes' },
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
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
  
        
  
        <View style={styles.listContainer}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.key}
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
  };
  
  const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
      flex: 1,
      paddingTop: 20,
      marginHorizontal: 20
    },
    pickerContainer: {
      marginEnd: 100,
      marginBottom: 100, // Ajusta este valor según sea necesario para dar espacio al menú desplegable
    },
    inputContainer: {
      marginHorizontal: 20,
      marginBottom: 10,
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
    },
    buttonContainer: {
      marginHorizontal: 20,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
    listContainer: {
      flex: 1,
      marginHorizontal: 20,
    },
    item: {
      padding: 15,
      marginVertical: 8,
      backgroundColor: '#e7e7e7',
      borderRadius: 5,
    },
    itemText: {
      fontSize: 18,
    },
    headerBar: {
        backgroundColor: '#fff',
        paddingTop: 10, // Adjust for status bar height if necessary
        paddingBottom: 40,
        paddingHorizontal: 10,
        // Add shadow or elevation if you want to give it depth
      },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        position: 'absolute', // Position absolutely within the parent view             // Adjust top and left as needed for your layout
      },  
    finish: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        position: 'absolute', // Position absolutely within the parent view             // Adjust top and left as needed for your layout
        right: 10,
        top: 10,
    },
    finishButton: {
        color: '#0093F2',
        fontSize: 20,
    }
  });