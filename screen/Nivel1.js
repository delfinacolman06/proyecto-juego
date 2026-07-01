import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function Nivel1() {
    return (
        <View style={styles.center}>
            <Text>Pantalla nivel 1</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
