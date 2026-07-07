/*import { View, Text, StyleSheet } from 'react-native'
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
        /*backgroundColor: '#d6e3ff',
        backgroundColor: 'transparent',
    },
});*/
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BotonJugar from './BotonJugar';
import Nivel1 from './screen/Nivel1';
import Nivel2 from './screen/Nivel2';
import Nivel3 from './screen/Nivel3';
const Stack = createStackNavigator();


/*function Home() {
  return (
    <View style={styles.center}>
      <Text>Pantalla de Inicio</Text>
    </View>
  );
}*/


function Niveles({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.titulo}>ℕ𝕚𝕧𝕖𝕝𝕖𝕤</Text>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Nivel 1')}>
        <Text style={styles.texto}>Nivel 1</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Nivel 2')}>
        <Text style={styles.texto}>Nivel 2</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Nivel 3')}>
        <Text style={styles.texto}>Nivel 3</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        /*headerStyle: {
          backgroundColor: '#1c3482',
        },*/
        headerTintColor: '#ffffff',
        /*headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },*/  
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="Niveles"
        component={Niveles}
        options={{ title: 'Niveles' }}
      />
      <Stack.Screen
        name="Nivel 1"
        component={Nivel1}
        options={{ title: 'Nivel 1' }}
      />
       <Stack.Screen
        name="Nivel 2"
        component={Nivel2}
        options={{ title: 'Nivel 2' }}
      />
       <Stack.Screen
        name="Nivel 3"
        component={Nivel3}
        options={{ title: 'Nivel 3' }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'transparent',
},

center:{
    width:'100%',
    alignItems:'center',
},

titulo: {
    color: '#d6e3ff',
    /*fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    margin: 50,
    textAlign: 'center',
    fontFamily: "'Courier New', monospace",*/
    
    fontFamily: 'Courier New',
    fontWeight: '900',      // Esto activa el grosor máximo (Bold)
    fontSize: 56,           // Tamaño de letra sugerido
   // letterSpacing: 1.5,     // Separa las letras para el efecto píxel
    fontVariant: ['tabular-nums'], 
  },

boton:{
    backgroundColor:'#57319e',
    paddingVertical:15,
    width:'30%',
    borderRadius:25,
    alignItems:'center',
    marginBottom:20,
},

texto:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
}, 
botones: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },

});
