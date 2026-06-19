/*import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'

import Menu from './Menu';


export default function Jugar() {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => alert("hola")}>
                <Text>Tocar</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        color: '#000000'
    },
});*/
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Menu from './Menu'
export default function Jugar({ navigation }) {
    return (
        <View style={styles.center}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.texto}>Jugar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7688ac'
    },
    boton: {
        backgroundColor: '#1c3482',
        padding: 20,
        borderRadius: 10
    },
    texto: {
        color: 'white',
        fontSize: 22
    }
})
