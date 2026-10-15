import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Niveles from '../Niveles';

const Stack = createStackNavigator();


function Home({ navigation }) {
  return (
    <View style={styles.center}>
     <View style={styles.historia}>
    <Text style={styles.tituloHistoria}>
        ¡UN ACCIDENTE EN LA LUNA CAMBIÓ TODO! 
    </Text>
<Text style={styles.emoji}>🌙👽</Text>
    <Text style={styles.textoHistoria}>
        Un pequeño alienígena cayó a la Tierra y perdió los pedazos
        de su nave por el camino. Ahora deberá saltar entre bloques,
        recuperar las piezas y llegar hasta la Luna para reparar
        su nave y volver a casa. 🚀
    </Text>
</View>
<TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Niveles')}>
      <Text style={styles.texto}>Jugar</Text>
      </TouchableOpacity>
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
       /* cardStyle: {
          backgroundColor: '#1552d4',
        },*/
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen
        name="🏠︎ Home"
        component={Home}
        options={{ title: 'Inicio' }}
      />
      <Stack.Screen
        name="Niveles"
        component={Niveles}
        options={{ title: 'Niveles' }}
      />
    </Stack.Navigator>
    
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    
  },
  historia: {
    width: '90%',
    marginTop: 50,
    padding: 20,
    backgroundColor:'',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    marginBottom: -50,
},
emoji:{
fontSize:30,
margin:2,
},
tituloHistoria: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 10,

    // Sombra del texto
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
},

textoHistoria: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'sans-serif-condensed',
    lineHeight: 27,
    textAlign: 'center',

    // Sombra del texto
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
},
  boton: {
    marginTop: -10,
    width: 250,
    height: 80,
    backgroundColor: '#0a108450',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    borderWidth: 2,
    borderColor: '#00000066',
  },
  texto:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
}, 
});
/*TRANSPARENCIA:
    Color     |   Opacidad
--------------|---------------
#57319eFF   |      100%
#57319eCC   |      80%
#57319e99   |      60%
#57319e66   |      40%
#57319e33   |      20% 

*/