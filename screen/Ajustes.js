import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Ajustes({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Cuenta')}>
                <Text style={styles.texto}>Cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Sonido')}>
                <Text style={styles.texto}>Sonido</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Idioma')}>
                <Text style={styles.texto}>Idioma</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('AcercaDelJuego')}>
                <Text style={styles.texto}>Acerca del juego</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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