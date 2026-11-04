import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Home({ navigation, cuenta }) {
  return (
    <View style={styles.center}>

      <TouchableOpacity style={styles.boton}  onPress={() => navigation.navigate('Niveles', { cuenta: cuenta })}>
        <Text style={styles.texto}>
          Empezar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('ComoJugar')}>
        <Text style={styles.texto}>
          ¿Cómo jugar?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('EstadoNave', { cuenta: cuenta })}>
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

/*TRANSPARENCIA:
    Color     |   Opacidad
--------------|---------------
#57319eFF   |      100%
#57319eCC   |      80%
#57319e99   |      60%
#57319e66   |      40%
#57319e33   |      20% 

*/