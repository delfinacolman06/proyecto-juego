import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

const ANCHO_ALIEN = 50;
const ALTO_ALIEN = 50;
const ANCHO_BLOQUE = width / 3 - 20;
const ALTO_BLOQUE = 25;
const ESPACIO = 110;
const CANTIDAD_BLOQUES = 8;

const GRAVEDAD = 0.5;
const FUERZA_SALTO = -12;
const VELOCIDAD_ALIEN = 6;
const VELOCIDAD_PANTALLA = 1.5;
/* 
const COLORES = [
    '#FF5E5B',
    '#D81159',
    '#FFBC42',
    '#0496FF',
    '#00F5D4',
]; */
const COLORES=['#4d3707'];
function columnaRandom(ultimaColumna) {
    let columna;

    do {
        columna = Math.floor(Math.random() * 3);
    } while (columna === ultimaColumna);

    return columna;
}

function crearPlataformas() {
    const plataformas = [];

    plataformas.push({
        id: 'base',
        x: 10,
        y: height - 90,
        width: width - 20,
        height: 20,
        color: '#555555',
    });

    let ultimaColumna = -1;

    for (let i = 1; i < CANTIDAD_BLOQUES; i++) {
        const columna = columnaRandom(ultimaColumna);
        ultimaColumna = columna;

        plataformas.push({
            id: i.toString(),
            x: columna * (width / 3) + 10,
            y: height - 90 - i * ESPACIO,
            width: ANCHO_BLOQUE,
            height: ALTO_BLOQUE,
            color: COLORES[Math.floor(Math.random() * COLORES.length)],
        });
    }

    return plataformas;
}

function crearJugador() {
    return {
        x: width / 2 - ANCHO_ALIEN / 2,
        y: height - 90 - ALTO_ALIEN,
        vy: FUERZA_SALTO,
    };
}

export default function Nivel1() {
    const [plataformas, setPlataformas] = useState(crearPlataformas);
    const [jugador, setJugador] = useState(crearJugador);
    const [activo, setActivo] = useState(false);
    const [perdio, setPerdio] = useState(false);
    const [puntos, setPuntos] = useState(0);

    const jugadorRef = useRef(jugador);
    const plataformasRef = useRef(plataformas);
    const direccionRef = useRef(0);
    const puntosRef = useRef(0);
    const ultimaColumnaRef = useRef(-1);

    function comenzarJuego() {
        const nuevasPlataformas = crearPlataformas();
        const nuevoJugador = crearJugador();

        jugadorRef.current = nuevoJugador;
        plataformasRef.current = nuevasPlataformas;
        direccionRef.current = 0;
        puntosRef.current = 0;
        ultimaColumnaRef.current = -1;

        setJugador(nuevoJugador);
        setPlataformas(nuevasPlataformas);
        setPuntos(0);
        setPerdio(false);
        setActivo(true);
    }

    useEffect(() => {
        if (!activo) return;

        const intervalo = setInterval(() => {
            const anterior = jugadorRef.current;
            const nuevoJugador = { ...anterior };

            nuevoJugador.x += direccionRef.current * VELOCIDAD_ALIEN;

            if (nuevoJugador.x < 0) nuevoJugador.x = 0;

            if (nuevoJugador.x > width - ANCHO_ALIEN) {
                nuevoJugador.x = width - ANCHO_ALIEN;
            }

            const plataformasAnteriores = plataformasRef.current;

            let nuevasPlataformas = plataformasAnteriores.map(p => ({
                ...p,
                y: p.y + VELOCIDAD_PANTALLA,
            }));

            nuevoJugador.vy += GRAVEDAD;
            nuevoJugador.y += nuevoJugador.vy + VELOCIDAD_PANTALLA;

            // La cámara acompaña al alien cuando sube.
            if (nuevoJugador.y < height / 3) {
                const diferencia = height / 3 - nuevoJugador.y;
                nuevoJugador.y += diferencia;

                nuevasPlataformas = nuevasPlataformas.map(p => ({
                    ...p,
                    y: p.y + diferencia,
                }));
            }

            // Comprobar si aterriza sobre una plataforma.
            if (nuevoJugador.vy > 0) {
                for (let i = 0; i < nuevasPlataformas.length; i++) {
                    const plataforma = nuevasPlataformas[i];
                    const anteriorPlataforma = plataformasAnteriores.find(
                        p => p.id === plataforma.id
                    );

                    if (!anteriorPlataforma) continue;

                    const antesAbajo = anterior.y + ALTO_ALIEN;
                    const ahoraAbajo = nuevoJugador.y + ALTO_ALIEN;

                    const tocaHorizontalmente =
                        nuevoJugador.x + ANCHO_ALIEN > plataforma.x &&
                        nuevoJugador.x < plataforma.x + plataforma.width;

                    const caeSobrePlataforma =
                        antesAbajo <= anteriorPlataforma.y + 4 &&
                        ahoraAbajo >= plataforma.y;

                    if (tocaHorizontalmente && caeSobrePlataforma) {
                        nuevoJugador.y = plataforma.y - ALTO_ALIEN;
                        nuevoJugador.vy = FUERZA_SALTO;
                        break;
                    }
                }
            }

            // Si el alien cae fuera de la pantalla, termina la partida.
            if (nuevoJugador.y > height) {
                setActivo(false);
                setPerdio(true);
                direccionRef.current = 0;
                return;
            }

            // Eliminar plataformas que salieron por abajo.
            const cantidadAntes = nuevasPlataformas.length;

            nuevasPlataformas = nuevasPlataformas.filter(
                p => p.y < height
            );

            if (nuevasPlataformas.length < cantidadAntes) {
                puntosRef.current += cantidadAntes - nuevasPlataformas.length;
                setPuntos(puntosRef.current);
            }

            // Crear plataformas nuevas arriba.
            while (nuevasPlataformas.length < CANTIDAD_BLOQUES) {
                const masAlta = Math.min(
                    ...nuevasPlataformas.map(p => p.y)
                );

                const columna = columnaRandom(ultimaColumnaRef.current);
                ultimaColumnaRef.current = columna;

                nuevasPlataformas.push({
                    id: `${Date.now()}-${Math.random()}`,
                    x: columna * (width / 3) + 10,
                    y: masAlta - ESPACIO,
                    width: ANCHO_BLOQUE,
                    height: ALTO_BLOQUE,
                    color: COLORES[Math.floor(Math.random() * COLORES.length)],
                });
            }

            jugadorRef.current = nuevoJugador;
            plataformasRef.current = nuevasPlataformas;

            setJugador({ ...nuevoJugador });
            setPlataformas([...nuevasPlataformas]);
        }, 16);

        return () => clearInterval(intervalo);
    }, [activo]);

    return (
        <ImageBackground source={require('../assets/nivel1-fondo.jpg')} style={styles.game} >
            <View style={[styles.columna, { left: 0 }]} />
            <View style={[ styles.columna, { left: width / 3, backgroundColor: 'transparent' },]}/>
            <View style={[styles.columna,{ left: (width / 3) * 2 },]}/>

            {plataformas.map(p => (
                <View
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: p.x,
                        top: p.y,
                        width: p.width,
                        height: p.height,
                        backgroundColor: p.color,
                        borderRadius: 5,
                    }}
                />
            ))}

            <Image
                source={require('../assets/alien.png')}
                style={[
                    styles.alien,
                    {
                        left: jugador.x,
                        top: jugador.y,
                    },
                ]}
            />

            <View style={styles.marcador}>
                <Text style={styles.textoMarcador}>Puntos: {puntos}</Text>
            </View>

            {/* Controles táctiles */}
            <Pressable
                style={[styles.boton, styles.izquierda]}
                onPressIn={() => { direccionRef.current = -1; }}
                onPressOut={() => { direccionRef.current = 0; }}
            >
                <Text style={styles.textoBoton}>←</Text>
            </Pressable>

            <Pressable
                style={[styles.boton, styles.derecha]}
                onPressIn={() => { direccionRef.current = 1; }}
                onPressOut={() => { direccionRef.current = 0; }}
            >
                <Text style={styles.textoBoton}>→</Text>
            </Pressable>

            {/* Pantalla de inicio y de derrota */}
            {!activo && (
                <View style={styles.capa}>
                    <Text style={styles.titulo}>
                        {perdio ? '¡Perdiste!' : 'UP'}
                    </Text>

                    <Text style={styles.subtitulo}>
                        {perdio
                            ? `Puntuación: ${puntos}`
                            : '¡Subí antes de que te atrape la pantalla!'}
                    </Text>

                    <Pressable
                        style={styles.botonEmpezar}
                        onPress={comenzarJuego}
                    >
                        <Text style={styles.textoEmpezar}>
                            {perdio ? 'REINTENTAR' : 'EMPEZAR JUEGO'}
                        </Text>
                    </Pressable>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    game: {
        flex: 1,
        backgroundColor: '#102d72',
        overflow: 'hidden',
    },

    columna: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: width / 3,
        backgroundColor: 'transparent',
    },

    alien: {
        position: 'absolute',
        width: ANCHO_ALIEN,
        height: ALTO_ALIEN,
        resizeMode: 'contain',
    },

    marcador: {
        position: 'absolute',
        top: 15,
        alignSelf: 'center',
        backgroundColor: '#11111199',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 12,
    },

    textoMarcador: {
        color: '#00F5D4',
        fontSize: 20,
        fontWeight: 'bold',
    },

    boton: {
        position: 'absolute',
        bottom: 35,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#444444dd',
        justifyContent: 'center',
        alignItems: 'center',
    },

    izquierda: {
        left: 25,
    },

    derecha: {
        right: 25,
    },

    textoBoton: {
        color: 'white',
        fontSize: 38,
    },

    capa: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000bb',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },

    titulo: {
        color: '#00F5D4',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    subtitulo: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 25,
    },

    botonEmpezar: {
        backgroundColor: '#FFBC42',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
    },

    textoEmpezar: {
        color: '#111111',
        fontSize: 17,
        fontWeight: 'bold',
    },
});