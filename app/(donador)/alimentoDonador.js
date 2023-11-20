import React, { useState } from 'react';
import { View, FlatList, Button, Modal, TextInput, StyleSheet, Text } from 'react-native';

export default function AlimentoDonador() {
const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, { key: `${items.length}`, value: inputValue }]);
      setInputValue('');
      setIsModalOpen(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Item" onPress={() => setIsModalOpen(true)} />

      <Modal visible={isModalOpen} animationType="slide">
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter item"
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
          />
          <Button title="Submit" onPress={addItem} />
        </View>
      </Modal>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
  },
  input: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});