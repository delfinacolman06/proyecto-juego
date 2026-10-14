import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AcercaDelJuego() {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Pantalla de Acerca del Juego</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#102d72',
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        color: 'white',
        fontSize: 24,
    },
});