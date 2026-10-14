import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cuenta from './ajustes/Cuenta'
import Sonido from './ajustes/Sonido'
import Idioma from './ajustes/Idioma'
import AcercaDelJuego from './ajustes/AcercaDelJuego'

const Stack = createNativeStackNavigator();

// Pantalla que contiene los cuatro botones
function MenuAjustes({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.boton}
                onPress={() => navigation.navigate('Cuenta')}
            >
                <Text style={styles.texto}>Cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.boton}
                onPress={() => navigation.navigate('Sonido')}
            >
                <Text style={styles.texto}>Sonido</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.boton}
                onPress={() => navigation.navigate('Idioma')}
            >
                <Text style={styles.texto}>Idioma</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.boton}
                onPress={() => navigation.navigate('AcercaDelJuego')}
            >
                <Text style={styles.texto}>Acerca del juego</Text>
            </TouchableOpacity>
        </View>
    );
}

// Navegación interna de Ajustes
export default function Ajustes() {
    return (
        <Stack.Navigator
            initialRouteName="MenuAjustes"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1c348200',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: 'transparent',
                },
            }} 
      
        >
            <Stack.Screen
                name="MenuAjustes"
                component={MenuAjustes}
                   options={{
        headerShown: false,
    }}
            />

            <Stack.Screen
                name="Cuenta"
                component={Cuenta}
                options={{ title: 'Cuenta' }}
            />

            <Stack.Screen
                name="Sonido"
                component={Sonido}
                options={{ title: 'Sonido' }}
            />

            <Stack.Screen
                name="Idioma"
                component={Idioma}
                options={{ title: 'Idioma' }}
            />

            <Stack.Screen
                name="AcercaDelJuego"
                component={AcercaDelJuego}
                options={{ title: 'Acerca del juego' }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    boton: {
        width: '90%',
        backgroundColor: 'rgba(87, 49, 158, 0.75)',
        paddingVertical: 18,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: 'center',
    },

    texto: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
});