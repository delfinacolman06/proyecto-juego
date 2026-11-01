import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

export default function EstadoNave({ navigation }) {
  return (
    <ImageBackground source={require('../assets/fondoMenu.png')} style={styles.center} resizeMode="cover">
      <Text style={styles.titulo}>Estado de la Nave</Text>

      <View style={styles.botones}>
        <View style={styles.contorno}>
            <Text style={styles.textoRec}>
                Tu nave se encuentra en buen estado. Puedes continuar jugando sin preocupaciones.
            </Text>
        </View>
        <View style={styles.contorno}>
            <Text style={styles.textoRec}>
                Imagen de la nave y sus actualizaciones cuando pasa de nivel
            </Text>
        </View>
        <View style={styles.contorno}>
        <Text style={styles.textoRec}>
            Comienza apartir del nivel 1 y completa los niveles para desbloquear el siguiente: 
        </Text>
        </View>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Nivel 1')}
        >
          <Text style={styles.texto}>Nivel 1</Text>
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
  textoRec: {
    color: 'white',
    fontSize: 16,
    width: '90%',
    padding: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'justify',
  },
  contorno: {
    width: '85%',
    height: 'auto',
    backgroundColor: '#121c65cc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00000066',
  },
  botones: {
    justifyContent: 'space-evenly',
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
});