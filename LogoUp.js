import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function LogoUp() {
  return (
    <View style={styles.center}>
      <Image source={require('./assets/Logo.png')} style={styles.logo} resizeMode="contain">
      </Image>
    </View>
  )
}
const styles = StyleSheet.create({
    center: {
      //backgroundColor: 'yellow',
      marginTop: -60,
    },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 20,
    //backgroundColor: 'red',
  },
});