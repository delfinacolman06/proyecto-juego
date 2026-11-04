import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image
} from 'react-native';

// Convertir la duración a HH:MM:SS
const formatoTiempo = (duracion) => {

    if (
        duracion === null ||
        duracion === undefined ||
        duracion === ''
    ) {
        return '00:00:00';
    }

    // Si MySQL ya devuelve HH:MM:SS
    if (
        typeof duracion === 'string' &&
        /^\d{1,2}:\d{2}:\d{2}$/.test(duracion)
    ) {
        return duracion;
    }

    // Si llega como segundos
    const segundos = Number(duracion);

    if (!Number.isFinite(segundos)) {
        return '00:00:00';
    }

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return (
        String(horas).padStart(2, '0') + ':' +
        String(minutos).padStart(2, '0') + ':' +
        String(segundosRestantes).padStart(2, '0')
    );
};

export default function Rankings({ route, cuenta: cuentaProp }) {

    const cuenta = cuentaProp || route?.params?.cuenta;
    const idUsuarioActual = cuenta?.idusuario;

    const [jugadores, setJugadores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'http://10.0.10.146:3000';

    useEffect(() => {

        const obtenerRanking = async () => {

            try {

                setCargando(true);
                setError('');

                console.log('CUENTA RECIBIDA EN RANKINGS:', cuenta);
                console.log('ID DEL USUARIO ACTUAL:', idUsuarioActual);

                const respuesta = await fetch(`${API_URL}/ranking`);
                const datos = await respuesta.json();

                console.log('DATOS RECIBIDOS DEL RANKING:', datos);

                if (!respuesta.ok) {
                    throw new Error(
                        datos.mensaje || 'No se pudo obtener el ranking.'
                    );
                }

                if (!Array.isArray(datos)) {
                    throw new Error('El servidor no devolvió una lista válida.');
                }

                // Ordenar por mayor puntaje y luego menor duración
                const convertirASegundos = (tiempo) => {

                    if (!tiempo) return Infinity;

                    if (typeof tiempo === 'number') {
                        return tiempo;
                    }

                    const partes = String(tiempo).split(':').map(Number);

                    if (
                        partes.length !== 3 ||
                        partes.some(parte => !Number.isFinite(parte))
                    ) {
                        return Infinity;
                    }

                    return (
                        partes[0] * 3600 +
                        partes[1] * 60 +
                        partes[2]
                    );
                };

                const ordenados = [...datos].sort((a, b) => {

                    const diferenciaPuntaje =
                        Number(b.puntaje) - Number(a.puntaje);

                    if (diferenciaPuntaje !== 0) {
                        return diferenciaPuntaje;
                    }

                    return (
                        convertirASegundos(a.duracion) -
                        convertirASegundos(b.duracion)
                    );
                });

                setJugadores(ordenados);

            } catch (err) {

                console.log('ERROR AL OBTENER RANKING:', err);
                setError('No se pudo cargar el ranking.');

            } finally {

                setCargando(false);

            }
        };

        obtenerRanking();

    }, [idUsuarioActual]);

    // Buscar la posición del usuario actual
    const posicionUsuario = jugadores.findIndex(
        jugador =>
            Number(jugador.usuarios_idusuario) ===
            Number(idUsuarioActual)
    );

    return (

        <ScrollView contentContainerStyle={styles.contenedor}>

            {/* IMAGEN DEL TÍTULO */}
            <View style={styles.contenedorTitulo}>

                <Image
                    source={require('../assets/tituloRanking.png')}
                    style={styles.imagenTitulo}
                    resizeMode="contain"
                />

            </View>

            {cargando ? (

                <ActivityIndicator
                    size="large"
                    color="#ffffff"
                />

            ) : error !== '' ? (

                <Text style={styles.error}>
                    {error}
                </Text>

            ) : (

                <>

                    {/* MI POSICIÓN ARRIBA */}
                    <View style={styles.miPosicion}>

                        <Text style={styles.subtitulo}>
                            MI POSICIÓN
                        </Text>

                        {idUsuarioActual === undefined ||
                        idUsuarioActual === null ? (

                            <Text style={styles.mensaje}>
                                No se recibió el ID de tu cuenta.
                            </Text>

                        ) : posicionUsuario !== -1 ? (

                            <Text style={styles.mensaje}>
                                Estás en el puesto {posicionUsuario + 1}.
                            </Text>

                        ) : (

                            <Text style={styles.mensaje}>
                                Todavía no tenés partidas registradas.
                            </Text>

                        )}

                    </View>

                    {/* RANKING GENERAL */}
                    <Text style={styles.tituloGeneral}>
                        GENERAL
                    </Text> 

                    <View style={styles.encabezado}>

                        <Text style={styles.columnaPuesto}>
                            Puesto
                        </Text>

                        <Text style={styles.columnaUsuario}>
                            Usuario
                        </Text>

                        <Text style={styles.columnaPuntaje}>
                            Puntos
                        </Text>

                        <Text style={styles.columnaTiempo}>
                            Tiempo
                        </Text>

                    </View>

                    {jugadores.length === 0 ? (

                        <Text style={styles.mensaje}>
                            Todavía no hay partidas registradas.
                        </Text>

                    ) : (

                        jugadores.map((item, index) => {

                            const esUsuarioActual =
                                Number(item.usuarios_idusuario) ===
                                Number(idUsuarioActual);

                            return (

                                <View
                                    key={item.idpartida}
                                    style={[
                                        styles.fila,
                                        esUsuarioActual && styles.filaActual
                                    ]}
                                >

                                    <Text style={styles.columnaPuesto}>
                                        {index + 1}°
                                    </Text>

                                    <Text style={styles.columnaUsuario}>
                                        {item.nombre_usuario}
                                    </Text>

                                    <Text style={styles.columnaPuntaje}>
                                        {item.puntaje}
                                    </Text>

                                    <Text style={styles.columnaTiempo}>
                                        {formatoTiempo(item.duracion)}
                                    </Text>

                                </View>

                            );

                        })

                    )}

                </>

            )}

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    contenedor: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        padding: 15,
        paddingTop: 15
    },

    contenedorTitulo: {
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },

    imagenTitulo: {
        width: '85%',
        height: 100
    },

    miPosicion: {
        backgroundColor: '#57319e',
        borderRadius: 12,
        padding: 18,
        marginBottom: 25,
        alignItems: 'center'
    },

    subtitulo: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },

    mensaje: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 8
    },

    tituloGeneral: {
        color: '#ffffff',
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12
    },

    encabezado: {
        flexDirection: 'row',
        backgroundColor: '#57319e',
        paddingVertical: 14,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginBottom: 8
    },

    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7655ae',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginBottom: 8
    },

    filaActual: {
        backgroundColor: '#3d226f',
        borderWidth: 2,
        borderColor: '#ffffff'
    },

    columnaPuesto: {
        flex: 0.8,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 12
    },

    columnaUsuario: {
        flex: 1.5,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold'
    },

    columnaPuntaje: {
        flex: 0.9,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 12
    },

    columnaTiempo: {
        flex: 1.2,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 11
    },

    error: {
        color: '#ff4444',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20
    }

});