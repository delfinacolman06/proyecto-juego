/*import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Jugar from './Jugar'
export default function App() {
  return (
    <View style={styles.center}>
      <Jugar><Text>Hola</Text></Jugar>
    </View>
  )
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7688ac',
        color: '#000000'
    },
});*/
/* import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'

import Jugar from './Jugar'
import IniciarSesion from './IniciarSesion';
import Registrarse from './Registrarse';
import Menu from './Menu'

const Stack = createStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Jugar"
      component={Jugar}
    />

    <Stack.Screen
      name="IniciarSesion"
      component={IniciarSesion}
    />

    <Stack.Screen
      name="Registrarse"
      component={Registrarse}
    />

    <Stack.Screen
      name="Menu"
      component={Menu}
    />
  </Stack.Navigator>
</NavigationContainer>
  )
}
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Jugar from './Jugar';
import IniciarSesion from './IniciarSesion';
import Registrarse from './Registrarse';
import Menu from './Menu';

import Niveles from './Niveles';
import Nivel1 from './screen/Nivel1';
import Nivel2 from './screen/Nivel2';
import Nivel3 from './screen/Nivel3';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#1c3482',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
        }}
      >

        <Stack.Screen
          name="Jugar"
          component={Jugar}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="IniciarSesion"
          component={IniciarSesion}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Registrarse"
          component={Registrarse}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Niveles"
          component={Niveles}
          options={{
            title: 'Niveles',
          }}
        />
        <Stack.Screen
          name="Nivel 1"
          component={Nivel1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Nivel 2"
          component={Nivel2}
          options={{
            title: 'Nivel 2',
          }}
        />

        <Stack.Screen
          name="Nivel 3"
          component={Nivel3}
          options={{
            title: 'Nivel 3',
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
