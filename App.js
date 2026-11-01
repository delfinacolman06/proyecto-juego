import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Jugar from './Jugar';
import IniciarSesion from './IniciarSesion';
import Registrarse from './Registrarse';
import Menu from './Menu';

import Niveles from './Niveles';
import ComoJugar from './screen/ComoJugar';
import EstadoNave from './screen/EstadoNave';
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
          name="ComoJugar"
          component={ComoJugar}
          options={{
            title: '¿Cómo jugar?',
          }}
        />
        <Stack.Screen
          name="EstadoNave"
          component={EstadoNave}
          options={{
            title: 'Estado de la Nave',
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