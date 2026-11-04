
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Home({ navigation, cuenta }) {

  const abrirEstadoNave = () => {

    navigation.navigate('EstadoNave', {
      cuenta: cuenta
    });

  };

  return (
    <View style={styles.center}>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Niveles')}
      >
        <Text style={styles.texto}>
          Empezar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('ComoJugar')}
      >
        <Text style={styles.texto}>
          ¿Cómo jugar?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.boton}
        onPress={abrirEstadoNave}
      >
        <Text style={styles.texto}>
          Estado de la nave
        </Text>
      </TouchableOpacity>

    </View>
  );
}

export default Home;

const styles = StyleSheet.create({

  center: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  boton: {
    width: 250,
    height: 80,
    backgroundColor: '#0a188433',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    borderWidth: 2,
    borderColor: '#00000066',
  },

  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});
