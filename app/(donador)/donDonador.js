import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Button, VStack, NativeBaseProvider } from 'native-base';
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomTabBarDonador from '../../Components/BottomTabBarDonador';

export default function DonDonador() {
  const selectedTab = "donDonador";
  const router = useRouter();

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <VStack space={4} alignItems="center" style={styles.vstack}>

          <Text style={styles.title}>Donación de alimentos</Text>
          <View style={styles.buttonIconWrapper}>
            <Button
              style={styles.button}
              variant="solid"
              onPress={() => { }}
            >
              <MaterialCommunityIcons
                name="food-apple"
                size={50}
                color="white"
              />
            </Button>
          </View>

          <Text style={styles.title}>Donación monetaria</Text>
          <View style={styles.buttonIconWrapper}>
            <Button
              style={styles.button}
              variant="solid"
              onPress={() => router.replace("/moneDonador")}
            >
              <MaterialCommunityIcons
                name="currency-usd"
                size={50}
                color="white"
              />
            </Button>
          </View>

        </VStack>
        <BottomTabBarDonador selectedTab={selectedTab} />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  vstack: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonIconWrapper: {
    position: 'relative',
    width: '75%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
