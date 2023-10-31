import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function miss () {
  return (
    <View>
      <Text style={styles.text}>404 not found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "bold",
    },
  });
  