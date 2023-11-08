import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeBaseProvider, Button, Input } from 'native-base';

export default function MoneyDonator() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const amounts = [100, 200, 500, 1000];

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value.replace(/[^0-9]/g, ''));
    setSelectedAmount(null);
  };

  const handleDonate = () => {
    // Aquí integrarás con Stripe
    const finalAmount = customAmount || selectedAmount;
    console.log('Donating:', finalAmount);
    // Lógica para procesar el pago con Stripe
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Seleccione un monto para donar</Text>
        <View style={styles.buttonContainer}>
          {amounts.map((amount) => (
            <Button
              key={amount}
              onPress={() => handleSelectAmount(amount)}
              style={[
                styles.amountButton,
                selectedAmount === amount && styles.selectedButton,
              ]}
            >
              {`$${amount}`}
            </Button>
          ))}
        </View>
        <Text style={styles.orText}>O ingrese una cantidad personalizada:</Text>
        <Input
          keyboardType="numeric"
          value={customAmount}
          onChangeText={handleCustomAmountChange}
          placeholder="..."
          placeholderTextColor="#A6A6A6"
          style={styles.roundedInput}
          textAlign="center"
          fontSize="lg"
        />
        <Button onPress={handleDonate} style={styles.donateButton}>
          Donar
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountButton: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  orText: {
    fontSize: 18,
    marginVertical: 10,
  },
  donateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  roundedInput: {
    minWidth: 100,
    maxWidth: 100,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
  },
});
