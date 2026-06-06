import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function Home() {
return (
<View style={styles.center}>
<Text>Pantalla de Inicio</Text>
</View>
);
}
const styles = StyleSheet.create({
center: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#d6e3ff',
},
});