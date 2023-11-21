import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import BottomTabBarAdmin from "../../Components/BottomTabBarAdmin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getPermissionLabel = (clearance) => {
  switch (clearance) {
    case 0:
      return 'Admin';
    case 1:
      return 'Empleado';
    case 2:
      return 'Donador';
    default:
      return 'Error';
  }
};

export default function UsuariosAdmin() {

  const [expandedRows, setExpandedRows] = useState({});
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken"); // Obtiene el token del almacenamiento
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    try {
      const response = await fetch('https://api-three-kappa-45.vercel.app/users/', {
        headers: {
          Authorization: `Bearer ${token}`, // Usa el token en el encabezado de autorización
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Maneja la respuesta no exitosa
      }

      const data = await response.json();
      setData(data);
      setFilteredData(data);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const borrarUsuario = (item) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar este usuario?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => eliminarUsuarioConfirmado(item) 
        }
      ],
      { cancelable: false }
    );
  };  

  const eliminarUsuarioConfirmado = async (item) => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    try {
      const response = await fetch(`https://api-three-kappa-45.vercel.app/users/${item._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Actualizar el estado para reflejar que el usuario ha sido eliminado
      const updatedData = data.filter(userData => userData._id !== item._id);
      setData(updatedData);
      setFilteredData(updatedData);

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const newData = data.filter(item => {
      const itemData = `${item.email.toUpperCase()} ${item.name.toUpperCase()} ${item.phone.toString()} ${item.clearance.toString()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  useEffect(() => {
    const initialExpandedState = {};
    data.forEach(item => {
      initialExpandedState[item._id] = false;
    });
    setExpandedRows(initialExpandedState);
  }, []);

  const toggleExpand = (id) => {
    setExpandedRows(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const selectedTab = "usuariosAdmin";

  const renderActions = (item) => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => verDetalle(item)} style={styles.actionButton}>
        <Ionicons name="ios-eye" size={24} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => editarUsuario(item)} style={styles.actionButton}>
        <MaterialIcons name="edit" size={24} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => borrarUsuario(item)} style={styles.actionButton}>
        <FontAwesome name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const renderRow = (item, isExpanded) => (
    <View>
      <View style={styles.rowStyle}>
        <TouchableOpacity onPress={() => toggleExpand(item._id)} style={styles.cellStyle}>
          <AntDesign name={isExpanded ? 'up' : 'down'} size={20} color="black" />
        </TouchableOpacity>
        <Text style={[styles.cellStyle, styles.emailStyle]}>{item.email}</Text>
        <Text style={styles.cellStyle}>{getPermissionLabel(item.clearance)}</Text>
      </View>
      {isExpanded && (
        <View style={styles.actionsContainer}>
          {renderActions(item)}
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 30 }}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Buscar por Email, Nombre, Teléfono o Permiso..."
          onChangeText={handleSearch}
          value={search}
        />
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        {filteredData.map(item => {
          const isExpanded = expandedRows[item._id];
          return renderRow(item, isExpanded);
        })}
      </ScrollView>
      <BottomTabBarAdmin selectedTab={selectedTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    margin: 10
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cellStyle: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailStyle: {
    flex: 1,
    marginLeft: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    marginHorizontal: 10,
    padding: 5,
  },
});
