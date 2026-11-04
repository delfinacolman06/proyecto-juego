
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

export default function IniciarSesion({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const API_URL = 'http://192.168.0.44:3000';

  const iniciarSesion = async () => {

    setError('');

    if (usuario.trim() === '' || contrasena === '') {
      setError('Completá el usuario y la contraseña.');
      return;
    }

    setCargando(true);

    try {

      const respuesta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario.trim(),
          contrasena: contrasena
        })
      });

      const datos = await respuesta.json();

      console.log('DATOS DEL LOGIN:', datos);

      if (!respuesta.ok) {
        setError(datos.mensaje || 'Error al iniciar sesión.');
        return;
      }

      if (datos.idusuario == null) {
        setError('No se pudo identificar tu cuenta.');
        return;
      }

      const cuenta = {
        idusuario: Number(datos.idusuario),
        usuario: datos.usuario,
        email: datos.email
      };

      navigation.navigate('Menu', {
        cuenta: cuenta
      });

    } catch (err) {

      console.log('Error:', err);
      setError('No se pudo conectar con el servidor.');

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

        <Text style={styles.titulo}>Iniciar Sesión</Text>

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
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.boton}
          onPress={iniciarSesion}
          disabled={cargando}
        >
          <Text style={styles.textoBoton}>
            {cargando ? 'Verificando...' : 'Iniciar sesión'}
          </Text>
        </TouchableOpacity>

        {error !== '' && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('Registrarse')}
        >
          <Text style={styles.registro}>
            ¿No tenés cuenta? Registrate
          </Text>
        </TouchableOpacity>

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

  registro: {
    marginTop: 25,
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  error: {
    color: '#ff4444',
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center'
  }

});
