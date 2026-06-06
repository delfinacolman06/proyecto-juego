import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';

export default function Saludo() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>UP!</Text>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    height: 90,
    alignItems: 'center',
    backgroundColor: '#1c3482',
  },
titulo: {
  marginTop: 50,
  color: '#d6e3ff',
  fontSize: 24,
  fontWeight: 'bold',
},
});
