
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cuenta from './Cuenta';
import Sonido from './Sonido';
import Idioma from './Idioma';
import AcercaDelJuego from './AcercaDelJuego';

const Stack = createNativeStackNavigator();

// Menú principal de ajustes
function MenuAjustes({ navigation, cuenta }) {

    console.log('DATOS EN MENU AJUSTES:', cuenta);

    // Abrir la pantalla Mi cuenta y enviar los datos
    const abrirCuenta = () => {

        console.log('ENVIANDO DATOS A CUENTA:', cuenta);

        navigation.navigate('Cuenta', {
            idusuario: cuenta?.idusuario,
            usuario: cuenta?.usuario,
            email: cuenta?.email
        });

    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.boton}
                onPress={abrirCuenta}
            >
                <Text style={styles.texto}>Mi cuenta</Text>
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
export default function Ajustes({ route }) {

    // Recibir los datos enviados desde Menu.js
    const cuenta = route.params?.cuenta;

    console.log('DATOS RECIBIDOS EN AJUSTES:', cuenta);

    return (
        <Stack.Navigator
            initialRouteName="MenuAjustes"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1c3482',
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
                options={{
                    headerShown: false,
                }}
            >
                {(props) => (
                    <MenuAjustes
                        {...props}
                        cuenta={cuenta}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen
                name="Cuenta"
                component={Cuenta}
                options={{
                    title: 'Cuenta'
                }}
            />

            <Stack.Screen
                name="Sonido"
                component={Sonido}
                options={{
                    title: 'Sonido'
                }}
            />

            <Stack.Screen
                name="Idioma"
                component={Idioma}
                options={{
                    title: 'Idioma'
                }}
            />

            <Stack.Screen
                name="AcercaDelJuego"
                component={AcercaDelJuego}
                options={{
                    title: 'Acerca del juego'
                }}
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
