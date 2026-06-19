import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Niveles() {
  return (
    <View style={styles.center}>
      <Text>¡Comienza la aventura!</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d6e3ff',
    },
});