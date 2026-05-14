import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TouchableOpacity from './App'
export default function BotonJugar() {
  return (
    <View  style={styles.container}>
      <Text>Pantalla de niveles</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //width:'100%',
    //height:'100%',
    backgroundColor: '#ff8fd4',
    alignItems: 'center',
    justifyContent: 'center',   
  }
}
);