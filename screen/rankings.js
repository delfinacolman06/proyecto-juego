import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function rankings() {
return (
<View style={styles.center}>
<Text>Pantalla de Rankings</Text>
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