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
      <Text>Pantalla de niveles</Text>
     
      <Button
        title="Nivel 1"
        onPress={() => navigation.navigate('Nivel 1')}
      />
       <Button
        title="Nivel 2"
        onPress={() => navigation.navigate('Nivel 2')}
      />
       <Button
        title="Nivel 3"
        onPress={() => navigation.navigate('Nivel 3')}
      />
      <BotonJugar><Text>Hola</Text></BotonJugar>
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
  center: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        /*backgroundColor: '#d6e3ff',*/
        backgroundColor: 'transparent',
   
  },
 
 
});
