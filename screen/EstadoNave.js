
import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'http://192.168.0.44:3000';

export default function EstadoNave({ route }) {

  const cuenta = route.params?.cuenta;
  const idusuario = cuenta?.idusuario;

  const [niveles, setNiveles] = useState([
    { nivel: 1, piezas: 0, completado: 0 },
    { nivel: 2, piezas: 0, completado: 0 },
    { nivel: 3, piezas: 0, completado: 0 }
  ]);

  const [totalPiezas, setTotalPiezas] = useState(0);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {

      let activo = true;

      const cargarEstado = async () => {

        if (!idusuario) {
          setError('No se recibió el ID del usuario.');
          return;
        }

        try {

          setError('');

          /* const respuesta = await fetch(
            `${API_URL}/estadoNave/${idusuario}`
          );

          const datos = await respuesta.json(); */
          const respuesta = await fetch(
  `${API_URL}/estadoNave/${idusuario}`
);

const textoRespuesta = await respuesta.text();

console.log('ESTADO HTTP:', respuesta.status);
console.log('RESPUESTA DEL SERVIDOR:', textoRespuesta);

let datos;

try {
  datos = JSON.parse(textoRespuesta);
} catch (error) {
  throw new Error(
    'El servidor no devolvió JSON. Revisá la ruta del backend.'
  );
}

if (!respuesta.ok) {
  throw new Error(datos.mensaje || 'Error al consultar la nave');
}

          if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al consultar la nave');
          }

          if (activo) {
            setNiveles(datos.niveles);
            setTotalPiezas(datos.totalPiezas);
          }

        } catch (err) {

          console.log('Error al cargar estado de nave:', err);

          if (activo) {
            setError('No se pudo cargar el estado de la nave.');
          }

        }

      };

      cargarEstado();

      return () => {
        activo = false;
      };

    }, [idusuario])
  );

  const piezasNivel1 = niveles.find(n => n.nivel === 1)?.piezas || 0;
  const piezasNivel2 = niveles.find(n => n.nivel === 2)?.piezas || 0;
  const piezasNivel3 = niveles.find(n => n.nivel === 3)?.piezas || 0;

  const naveCompleta = totalPiezas >= 9;

  return (

    <ImageBackground
      source={require('../assets/fondoMenu.png')}
      style={styles.fondo}
      resizeMode="cover"
    >

      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.titulo}>
          Estado de la nave
        </Text>

        <Image
          source={
            naveCompleta
              ? require('../assets/naveCompleta.png')
              : require('../assets/naveIncompleta.png')
          }
          style={styles.nave}
          resizeMode="contain"
        />

        <Text style={styles.total}>
          Piezas obtenidas: {totalPiezas} / 9
        </Text>

        <View style={styles.niveles}>

          <Text style={styles.subtitulo}>Nivel 1: {piezasNivel1}/3</Text>
          <Text style={styles.subtitulo}>Nivel 2: {piezasNivel2}/3</Text>
          <Text style={styles.subtitulo}>Nivel 3: {piezasNivel3}/3</Text>

        </View>

        {error !== '' && (
          <Text style={styles.error}>{error}</Text>
        )}

        {naveCompleta && (
          <Text style={styles.completo}>
            ¡Completaste tu nave!
          </Text>
        )}

      </ScrollView>

    </ImageBackground>

  );
}

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  nave: {
    width: 280,
    height: 250,
  },

  total: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  niveles: {
    width: '85%',
    backgroundColor: '#0a188477',
    borderRadius: 15,
    padding: 20,
  },

  subtitulo: {
    color: 'white',
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },

  error: {
    color: '#ff5555',
    fontSize: 16,
    marginTop: 15,
  },

  completo: {
    color: '#7CFF9B',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  }

});
