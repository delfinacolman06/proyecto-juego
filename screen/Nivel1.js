
/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Nivel1() {
    return (
        <View style={styles.game}>

            {/* Alienígena *//* } */
           /*  <View style={styles.alien}>
                <Text style={styles.alienText}>👽</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    game: {
        flex: 1,
        backgroundColor: '#102d72',
    },

    alien: {
        position: 'absolute',
        bottom: 150,
        
    },

    alienText: {
        fontSize: 50,
    },
});
 */ 

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Nivel1() {
    return (
        <View style={styles.game}>

            {/* Alienígena */}
            <View style={styles.alien}>
                <Image
                    source={require('../assets/alien.png')}
                    style={styles.alienImage}
                />
            </View>

            {/* Plataforma */}
            <View style={styles.bloque}>
                <Image
                    source={require('../assets/bloque.png')}
                    style={styles.bloqueImage}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    game: {
        flex: 1,
        backgroundColor: '#102d72',
    },

    alien: {
        position: 'absolute',
        bottom: 180,
    },

    alienImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },

    bloque: {
        position: 'absolute',
        bottom: 130, //al aumentar sube, al reducir baja.
        left: 50, //al aumentar se mueve a la derecha, al reducir se mueve a la izquierda
        width: 200,
        height: 30,
    },

    bloqueImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
});


