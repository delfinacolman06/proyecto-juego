
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';

export default function Registrarse({ navigation }) {

  // Estados de los campos
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Estados para errores y carga
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Dirección del servidor
  const API_URL = 'http://192.168.0.159:3000';

  // Función para registrar
  const registrar = async () => {

    setErrores([]);

    if (
      email.trim() === '' ||
      usuario.trim() === '' ||
      contrasena === ''
    ) {
      setErrores(['Completá todos los campos.']);
      return;
    }

    setCargando(true);

    try {

      const respuesta = await fetch(`${API_URL}/registro`, {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email: email.trim(),
          usuario: usuario.trim(),
          contrasena: contrasena
        })

      });

      const datos = await respuesta.json();

      // Si hay datos repetidos o algún error
      if (!respuesta.ok) {

        if (datos.errores) {
          setErrores(datos.errores);
        } else {
          setErrores([
            datos.mensaje || 'No se pudo realizar el registro.'
          ]);
        }

        return;
      }

      // Registro exitoso
      Alert.alert(
        'Registro exitoso',
        'Tu usuario fue creado correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => navigation.navigate('IniciarSesion')
          }
        ]
      );

      // Limpiar campos
      setEmail('');
      setUsuario('');
      setContrasena('');

    } catch (err) {

      console.log('Error:', err);

      setErrores([
        'No se pudo conectar con el servidor.'
      ]);

    } finally {

      setCargando(false);

    }

  };

  return (

    <ImageBackground
      source={require('./assets/fondoMenu.png')}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.container}>

        <Text style={styles.titulo}>Registrarse</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#999"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={registrar}
          disabled={cargando}
        >

          <Text style={styles.textoBoton}>
            {cargando ? 'Registrando...' : 'Registrar'}
          </Text>

        </TouchableOpacity>

        {/* Mostrar errores */}
        {errores.map((mensaje, index) => (

          <Text key={index} style={styles.error}>
            {mensaje}
          </Text>

        ))}

      </View>

    </ImageBackground>

  );

}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  titulo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },

  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#57319e',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  error: {
    color: '#ff4444',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
  }

});
