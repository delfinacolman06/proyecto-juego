import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Saludo from './Saludo'
import BotonJugar from './BotonJugar';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
       <Saludo></Saludo>
       <TouchableOpacity> <Text>BotonJugar</Text></TouchableOpacity>
       <BotonJugar></BotonJugar>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
