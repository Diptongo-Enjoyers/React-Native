import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import BottomTabBarAdmin from "../../Components/BottomTabBarAdmin";

const data = [
  {
      "_id": "652e960ce6cc34010efc33a0",
      "email": "danielmd4190@gmail.com",
      "password": "$2b$10$oyZU60acBEJRERnU3.o11uG5vPuKMQ31no6/mnZZIQ5alpUKIAXua",
      "username": "pruebaaaa",
      "name": "Juan Daniel",
      "address": "Calle Falsa 123",
      "phone": 1234567890,
      "clearance": 1,
      "__v": 0
  },
  {
      "_id": "652e96d6f5b3be4ec847ea0e",
      "email": "cdamezcua@outlook.com.mx",
      "password": "$2b$10$2aAr.bPnh67CcwLS9uMGwePNSZzWmtU0p5hpVMmlNBmneEi7zjVhS",
      "username": "amezcua",
      "name": "Carlos Amezcua",
      "address": "Calle Falsa 123",
      "phone": 1234567890,
      "clearance": 1,
      "__v": 0
  },
  {
      "_id": "6542b7b6ff791a0109569793",
      "email": "cdamezcua1@outlook.com.mx",
      "password": "$2b$10$7MU8EfOqGNWWNmIZoJVNwuXExvhcP0RzK6.qQe9u1gU6HvSPUdpla",
      "username": "amezcua1",
      "name": "Carlos Amezcua",
      "address": "Calle Falsa 123",
      "phone": 1234567890,
      "clearance": 1,
      "__v": 0
  },
  {
      "_id": "654332d016208420e292d050",
      "email": "diego.curiel@tec.mx",
      "password": "$2b$10$e7DCxfvPzD4pOlMLx1HVCOxkdIsp68UcmlfD8ZMxEfLJ3vSzAAlny",
      "username": "Curiel",
      "clearance": 0,
      "__v": 0,
      "name": "Diego Curiel Castellanos",
      "phone": 5212345678,
      "profilePictureURL": "https://static01.nyt.com/images/2023/04/20/fashion/20HASBULLA/20HASBULLA-superJumbo.jpg?quality=75&auto=webp"
  },
]

export default function UsuariosAdmin() {
  const [expandedRows, setExpandedRows] = useState({});
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleSearch = (text) => {
    setSearch(text);
    const newData = data.filter(item => {
      const itemData = `${item.email.toUpperCase()} ${item.username.toUpperCase()} ${item.phone.toString()} ${item.clearance.toString()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  useEffect(() => {
    // Inicializar el estado de expansión para cada fila
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
  const screenWidth = Dimensions.get('window').width;
  const tableHead = ['Acciones', 'Email', 'Permiso'];
  const columnWidths = [screenWidth * 0.15, screenWidth * 0.55, screenWidth * 0.3];

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
        <Text style={styles.cellStyle}>{item.clearance.toString()}</Text>
      </View>
      {isExpanded && (
        <View style={styles.actionsContainer}>
          {renderActions(item)}
        </View>
      )}
    </View>
  );

  const tableData = filteredData.flatMap((item) => {
    const isExpanded = expandedRows[item._id];
    const baseRow = [
      <TouchableOpacity onPress={() => toggleExpand(item._id)}>
        <AntDesign name={isExpanded ? 'up' : 'down'} size={20} color="black" />
      </TouchableOpacity>,
      item.email,
      item.clearance.toString(),
    ];

    const actionsRow = isExpanded ? [
      null, // Espacio para la columna de la flecha
      {
        element: renderActions(item),
        colspan: 2 // Unir las siguientes dos columnas
      }
    ] : [];

    return [baseRow, actionsRow];
  });

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 30 }}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#000"/>
        <TextInput
          style={styles.input}
          placeholder="Buscar por Email, Usuario, Teléfono o Permiso..."
          onChangeText={handleSearch}
          value={search}
        />
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        {filteredData.map(item => renderRow(item, expandedRows[item._id]))}
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
    // Asegúrate de que la suma de las anchuras de cellStyle y emailStyle no exceda el ancho de la pantalla
  },
  cellStyle: {
    // Estilo para las celdas para mantener todo alineado y cuadriculado
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailStyle: {
    // Estilo adicional para el correo electrónico para darle más espacio
    flex: 1, // Toma el espacio restante
    marginLeft: 15, // Separación de la flecha
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Esto separará los íconos uniformemente
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    marginHorizontal: 10, // Añade margen horizontal para separar los íconos
    padding: 5, // Añade algo de padding si es necesario para aumentar el área táctil
  },
});