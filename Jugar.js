import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import IniciarSesion from './IniciarSesion'
import LogoUp from './LogoUp'

export default function Jugar({ navigation }) {
return (
    <ImageBackground 
        source={require('./assets/pantallajugar.jpg')} 
        style={ styles.background}
        resizeMode="cover"
    >
        <View style={styles.center}>
           <LogoUp /> 
        <TouchableOpacity
            style={styles.boton} onPress={() => navigation.navigate('IniciarSesion')}>
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
    backgroundColor: '#57319e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: 180,
    alignItems: 'center',
    marginTop: 1,
},
texto: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
},

})
