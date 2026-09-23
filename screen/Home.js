import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Rankings from './Rankings';
import Niveles from '../Niveles';

const Stack = createStackNavigator();


function Home({ navigation }) {
  return (
    <View style={styles.center}>
      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Niveles')}>
      <Text style={styles.texto}>Niveles</Text>
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
  boton: {
    width: 250,
    height: 80,
    backgroundColor: '#0a188433',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    borderWidth: 2,
    borderColor: '#00000066',
  },
  texto:{
    color:'white',
    fontSize:18,
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