
import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Alert,
    ScrollView
} from 'react-native';

export default function Cuenta({ navigation, route }) {

    // Datos recibidos desde MenuAjustes
    const {
        idusuario,
        usuario: usuarioInicial,
        email: emailInicial
    } = route.params || {};

    // Datos de la cuenta
    const [usuario, setUsuario] = useState(usuarioInicial || '');
    const [email, setEmail] = useState(emailInicial || '');
    const [contrasena, setContrasena] = useState('');

    // Control de las pantallas
    const [modificando, setModificando] = useState(false);

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const API_URL = 'http://192.168.0.159:3000';

    // MODIFICAR DATOS DE LA CUENTA
    const modificarCuenta = async () => {

        setError('');

        if (usuario.trim() === '' || email.trim() === '') {
            setError('Completá el nombre de usuario y el correo.');
            return;
        }

        if (!idusuario) {
            setError('No se recibió el ID de la cuenta.');
            return;
        }

        setCargando(true);

        try {

            const respuesta = await fetch(
                API_URL + '/cuenta/' + idusuario,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        mail: email.trim(),
                        nombre_usuario: usuario.trim(),
                        contrasena: contrasena
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setError(datos.mensaje || 'No se pudieron modificar los datos.');
                return;
            }

            // Actualizar los datos mostrados
            setUsuario(datos.usuario);
            setEmail(datos.email);
            setContrasena('');

            // Volver a Mi cuenta
            setModificando(false);

            Alert.alert(
                'Datos modificados',
                'Los datos de tu cuenta se actualizaron correctamente.'
            );

        } catch (err) {

            console.log('Error:', err);
            setError('No se pudo conectar con el servidor.');

        } finally {

            setCargando(false);

        }
    };

    // DAR DE BAJA LA CUENTA
    const eliminarCuenta = async () => {

        if (!idusuario) {
            setError('No se recibió el ID de la cuenta.');
            return;
        }

        setCargando(true);
        setError('');

        try {

            const respuesta = await fetch(
                API_URL + '/cuenta/' + idusuario,
                {
                    method: 'DELETE'
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setError(datos.mensaje || 'No se pudo eliminar la cuenta.');
                return;
            }

            Alert.alert(
                'Cuenta eliminada',
                'Tu cuenta y sus datos relacionados fueron eliminados.',
                [
                    {
                        text: 'Aceptar',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'IniciarSesion' }]
                            });
                        }
                    }
                ]
            );

        } catch (err) {

            console.log('Error:', err);
            setError('No se pudo conectar con el servidor.');

        } finally {

            setCargando(false);

        }
    };

    // CONFIRMAR ELIMINACIÓN
    const confirmarEliminacion = () => {

        Alert.alert(
            'Dar de baja',
            '¿Estás seguro de que querés eliminar tu cuenta? Se perderán tus partidas, puntajes y recompensas.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Aceptar',
                    style: 'destructive',
                    onPress: eliminarCuenta
                }
            ]
        );
    };

    return (

        <ImageBackground
            source={require('../assets/fondoMenu.png')}
            style={styles.background}
            resizeMode="cover"
        >

            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.container}>

                    <Text style={styles.titulo}>
                        {modificando ? 'Modificar mis datos' : 'Mi cuenta'}
                    </Text>

                    {!modificando ? (

                        // VISTA PRINCIPAL: SOLO MUESTRA LOS DATOS
                        <View style={styles.datos}>

                            <Text style={styles.etiqueta}>
                                Nombre de usuario
                            </Text>

                            <Text style={styles.valor}>
                                {usuario || 'No disponible'}
                            </Text>

                            <Text style={styles.etiqueta}>
                                Correo electrónico
                            </Text>

                            <Text style={styles.valor}>
                                {email || 'No disponible'}
                            </Text>

                            <TouchableOpacity
                                style={styles.boton}
                                onPress={() => {
                                    setError('');
                                    setModificando(true);
                                }}
                            >
                                <Text style={styles.textoBoton}>
                                    Modificar mis datos
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botonEliminar}
                                onPress={confirmarEliminacion}
                                disabled={cargando}
                            >
                                <Text style={styles.textoBoton}>
                                    Dar de baja
                                </Text>
                            </TouchableOpacity>

                        </View>

                    ) : (

                        // FORMULARIO: SOLO APARECE AL MODIFICAR
                        <View style={styles.datos}>

                            <Text style={styles.etiqueta}>
                                Nombre de usuario
                            </Text>

                            <TextInput
                                style={styles.input}
                                value={usuario}
                                onChangeText={setUsuario}
                                placeholder="Nombre de usuario"
                                placeholderTextColor="#888"
                                autoCapitalize="none"
                            />

                            <Text style={styles.etiqueta}>
                                Correo electrónico
                            </Text>

                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Correo electrónico"
                                placeholderTextColor="#888"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <Text style={styles.etiqueta}>
                                Nueva contraseña
                            </Text>

                            <TextInput
                                style={styles.input}
                                value={contrasena}
                                onChangeText={setContrasena}
                                placeholder="Dejar vacío para conservar la actual"
                                placeholderTextColor="#888"
                                secureTextEntry
                            />

                            <TouchableOpacity
                                style={styles.boton}
                                onPress={modificarCuenta}
                                disabled={cargando}
                            >
                                <Text style={styles.textoBoton}>
                                    {cargando ? 'Guardando...' : 'Guardar cambios'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botonCancelar}
                                onPress={() => {
                                    setUsuario(usuarioInicial || usuario);
                                    setEmail(emailInicial || email);
                                    setContrasena('');
                                    setError('');
                                    setModificando(false);
                                }}
                                disabled={cargando}
                            >
                                <Text style={styles.textoBoton}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                        </View>

                    )}

                    {error !== '' && (
                        <Text style={styles.error}>
                            {error}
                        </Text>
                    )}

                </View>

            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1
    },

    scroll: {
        flexGrow: 1,
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 30
    },

    titulo: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 35
    },

    datos: {
        width: '100%'
    },

    etiqueta: {
        color: '#ddd',
        fontSize: 16,
        marginBottom: 8
    },

    // Los datos se muestran como texto normal, no como inputs
    valor: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 25
    },

    // Inputs exclusivos del formulario de modificación
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 13,
        marginBottom: 20,
        fontSize: 16,
        color: '#222'
    },

    boton: {
        backgroundColor: '#57319e',
        width: '100%',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15
    },

    botonEliminar: {
        backgroundColor: '#a83232',
        width: '100%',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15
    },

    botonCancelar: {
        backgroundColor: '#555',
        width: '100%',
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 12
    },

    textoBoton: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },

    error: {
        color: '#ff5555',
        fontSize: 15,
        marginTop: 20,
        textAlign: 'center'
    }

});
