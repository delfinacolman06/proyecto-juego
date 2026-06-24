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
});
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Menu from './Menu'
export default function Jugar({ navigation }) {
    return (
        <View style={styles.center}>
            <TouchableOpacity style={styles.texto}
                onPress={() => navigation.navigate('Menu')}>
                <Text>hooo</Text>
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
})*/
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import Menu from './Menu'
export default function Jugar({ navigation }) {
return (
    <ImageBackground 
        source={require('./assets/pantallajugar.jpg')} 
        style={ styles.background}
        resizeMode="cover"
    >
        <View style={styles.center}>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.texto}>Jugar</Text>
        </TouchableOpacity>
        </View>
    </ImageBackground>
)
}
const styles = StyleSheet.create({
background: {
    flex: 1,
},
center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},

boton: {
    backgroundColor: '#1c3482',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '10px',
    alignItems: 'center',
},
texto: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
}
})
