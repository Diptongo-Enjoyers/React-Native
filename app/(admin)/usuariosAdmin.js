import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TextInput, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Ionicons } from '@expo/vector-icons';
import BottomTabBarAdmin from "../../Components/BottomTabBarAdmin";

const data = [
  {
      "_id": "652e960ce6cc34010efc33a0",
      "email": "danielmd4190@gmail.com",
      "password": "$2b$10$oyZU60acBEJRERnU3.o11uG5vPuKMQ31no6/mnZZIQ5alpUKIAXua",
      "username": "daniel",
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
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearch(text);
    const newData = data.filter(item => {
      const itemData = `${item.email.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  const selectedTab = "usuariosAdmin";
  const screenWidth = Dimensions.get('window').width;
  const tableHead = ['Email', 'Permiso'];
  const tableData = filteredData.map((item) => [item.email, item.clearance.toString()]);
  const columnWidths = [screenWidth * 0.7, screenWidth * 0.3];

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 30 }}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="#000"/>
        <TextInput
          style={styles.input}
          placeholder="Buscar por Email..."
          onChangeText={handleSearch}
          value={search}
        />
      </View>
      <ScrollView horizontal={true}>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
          <Row data={tableHead} widthArr={columnWidths} style={{ height: 40, backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6 }} />
          <Rows data={tableData} widthArr={columnWidths} textStyle={{ margin: 6 }} />
        </Table>
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
});