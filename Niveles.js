import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

export default function Niveles({ navigation }) {
  return (
    <ImageBackground source={require('./assets/fondoMenu.png')} style={styles.center} resizeMode="cover">
      <Text style={styles.titulo}>Completa los niveles</Text>

      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('Nivel 1')}
        >
          <Text style={styles.texto}>Nivel 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('Nivel 2')}
        >
          <Text style={styles.texto}>Nivel 2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('Nivel 3')}
        >
          <Text style={styles.texto}>Nivel 3</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  titulo: {
    color: '#d6e3ff',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
  },

  boton: {
    backgroundColor: '#0a188499',
    paddingVertical: 15,
    width: '30%',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  botones: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
});
