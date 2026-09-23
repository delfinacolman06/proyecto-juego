import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    Pressable,
    Text,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ===============================
// CONFIGURACIÓN DE BLOQUES
// ===============================

const COLUMNAS = 3;
const CANTIDAD_BLOQUES = 10;

const ESPACIO = 130;
const VELOCIDAD_BLOQUES = 3;

const ANCHO_BLOQUE = width / 3 - 20;
const ALTO_BLOQUE = 30;

// ===============================
// CONFIGURACIÓN DEL ALIEN
// ===============================

const ANCHO_ALIEN = 70;
const ALTO_ALIEN = 70;

const VELOCIDAD_ALIEN = 6;
const FUERZA_SALTO = 14;
const GRAVEDAD = 0.7;

// ===============================
// ELEGIR COLUMNA
// ===============================

function columnaRandom() {
    return Math.floor(Math.random() * COLUMNAS);
}

// ===============================
// POSICIÓN HORIZONTAL
// ===============================

function obtenerX(columna) {
    return columna * (width / 3) + 10;
}

// ===============================
// CREAR BLOQUES
// ===============================

function crearBloques() {
    const bloques = [];

    for (let i = 0; i < CANTIDAD_BLOQUES; i++) {
        const columna = columnaRandom();

        bloques.push({
            id: i.toString(),
            x: obtenerX(columna),
            y: -100 + i * ESPACIO,
        });
    }

    return bloques;
}

// ===============================
// NIVEL
// ===============================

export default function Nivel1() {

    // -------------------------------
    // BLOQUES
    // -------------------------------

    const [bloques, setBloques] = useState(
        crearBloques()
    );

    // -------------------------------
    // POSICIÓN DEL ALIEN
    // -------------------------------

    const alienX = useRef(width / 2 - ANCHO_ALIEN / 2);
    const alienY = useRef(height - 170);

    // Velocidad horizontal
    const velocidadX = useRef(0);

    // Velocidad vertical
    const velocidadY = useRef(0);

    // Saber si está apoyado
    const enElSuelo = useRef(false);

    // Saber si está sobre un bloque
    const sobreBloque = useRef(false);

    // -------------------------------
    // ANIMATED VALUES
    // -------------------------------

    const alienAnimatedX =
        useRef(
            new Animated.Value(
                width / 2 - ANCHO_ALIEN / 2
            )
        ).current;

    const alienAnimatedY =
        useRef(
            new Animated.Value(
                height - 170
            )
        ).current;

    // -------------------------------
    // REFERENCIA DE BLOQUES
    // -------------------------------

    const bloquesRef = useRef([]);

    useEffect(() => {
        bloquesRef.current = bloques;
    }, [bloques]);

    // ===============================
    // MOVIMIENTO DEL ALIEN
    // ===============================

    useEffect(() => {

        let animacion;

        const actualizar = () => {

            // ---------------------------
            // MOVIMIENTO HORIZONTAL
            // ---------------------------

            alienX.current += velocidadX.current;

            // Evitar que salga por los bordes

            if (alienX.current < 0) {
                alienX.current = 0;
            }

            if (
                alienX.current >
                width - ANCHO_ALIEN
            ) {
                alienX.current =
                    width - ANCHO_ALIEN;
            }

            // ---------------------------
            // GRAVEDAD
            // ---------------------------

            if (!enElSuelo.current) {

                velocidadY.current -= GRAVEDAD;

                alienY.current +=
                    velocidadY.current;
            }

            // ---------------------------
            // COLISIÓN CON BLOQUES
            // ---------------------------

            let aterrizoEnBloque = false;

            const alienIzquierda =
                alienX.current;

            const alienDerecha =
                alienX.current + ANCHO_ALIEN;

            const alienAbajo =
                alienY.current;

            const alienArriba =
                alienY.current + ALTO_ALIEN;

            bloquesRef.current.forEach(
                bloque => {

                    const bloqueIzquierda =
                        bloque.x;

                    const bloqueDerecha =
                        bloque.x +
                        ANCHO_BLOQUE;

                    const bloqueArriba =
                        height -
                        bloque.y;

                    const bloqueAbajo =
                        bloqueArriba -
                        ALTO_BLOQUE;

                    // --------------------------------
                    // COMPROBAR SI ESTÁ HORIZONTALMENTE
                    // SOBRE EL BLOQUE
                    // --------------------------------

                    const hayColisionHorizontal =
                        alienDerecha >
                        bloqueIzquierda &&
                        alienIzquierda <
                        bloqueDerecha;

                    // --------------------------------
                    // EL ALIEN ESTÁ CAYENDO
                    // --------------------------------

                    const estaCayendo =
                        velocidadY.current <= 0;

                    // --------------------------------
                    // COLISIÓN DESDE ARRIBA
                    // --------------------------------

                    if (
                        hayColisionHorizontal &&
                        estaCayendo &&
                        alienAbajo <= bloqueArriba &&
                        alienAbajo >= bloqueArriba - 25
                    ) {

                        alienY.current =
                            bloqueArriba;

                        velocidadY.current = 0;

                        enElSuelo.current = true;

                        sobreBloque.current = true;

                        aterrizoEnBloque = true;
                    }
                }
            );

            // ---------------------------
            // SI NO ESTÁ SOBRE BLOQUE
            // ---------------------------

            if (!aterrizoEnBloque) {

                if (
                    alienY.current <=
                    100
                ) {

                    alienY.current = 100;

                    velocidadY.current = 0;

                    enElSuelo.current = true;

                    sobreBloque.current = false;

                } else {

                    enElSuelo.current = false;

                    sobreBloque.current = false;
                }
            }

            // ---------------------------
            // ACTUALIZAR ANIMACIÓN
            // ---------------------------

            alienAnimatedX.setValue(
                alienX.current
            );

            alienAnimatedY.setValue(
                alienY.current
            );

            animacion =
                requestAnimationFrame(
                    actualizar
                );
        };

        animacion =
            requestAnimationFrame(
                actualizar
            );

        return () => {
            cancelAnimationFrame(animacion);
        };

    }, []);

    // ===============================
    // MOVIMIENTO DE BLOQUES
    // ===============================

    useEffect(() => {

        const intervalo =
            setInterval(() => {

                setBloques(
                    bloquesActuales => {

                        const nuevosBloques =
                            bloquesActuales.map(
                                bloque => ({
                                    ...bloque,
                                    y:
                                        bloque.y +
                                        VELOCIDAD_BLOQUES,
                                })
                            );

                        // ---------------------------
                        // RECICLAR BLOQUES
                        // ---------------------------

                        nuevosBloques.forEach(
                            bloque => {

                                if (
                                    bloque.y >
                                    height
                                ) {

                                    // Buscar bloque más arriba

                                    const otrosBloques =
                                        nuevosBloques
                                            .filter(
                                                b =>
                                                    b.id !==
                                                    bloque.id
                                            )
                                            .sort(
                                                (a, b) =>
                                                    a.y -
                                                    b.y
                                            );

                                    const masArriba =
                                        otrosBloques[0];

                                    if (masArriba) {

                                        // Colocarlo arriba

                                        bloque.y =
                                            masArriba.y -
                                            ESPACIO;

                                        // Columna del bloque superior

                                        const columnaArriba =
                                            Math.round(
                                                (
                                                    masArriba.x -
                                                    10
                                                ) /
                                                (width / 3)
                                            );

                                        // Elegir columna diferente

                                        let nuevaColumna =
                                            columnaRandom();

                                        while (
                                            nuevaColumna ===
                                            columnaArriba
                                        ) {

                                            nuevaColumna =
                                                columnaRandom();
                                        }

                                        bloque.x =
                                            obtenerX(
                                                nuevaColumna
                                            );
                                    }
                                }
                            }
                        );

                        return nuevosBloques;
                    }
                );

            }, 16);

        return () => {
            clearInterval(intervalo);
        };

    }, []);

    // ===============================
    // CONTROLES
    // ===============================

    const izquierda = () => {

        velocidadX.current =
            -VELOCIDAD_ALIEN;
    };

    const derecha = () => {

        velocidadX.current =
            VELOCIDAD_ALIEN;
    };

    const detener = () => {

        velocidadX.current = 0;
    };

    const saltar = () => {

        if (enElSuelo.current) {

            velocidadY.current =
                FUERZA_SALTO;

            enElSuelo.current = false;

            sobreBloque.current = false;
        }
    };

    // ===============================
    // PANTALLA
    // ===============================

    return (

        <View style={styles.game}>

            {/* ==========================
                COLUMNA 1
            =========================== */}

            <View
                style={styles.columna}
            />

            {/* ==========================
                COLUMNA 2
            =========================== */}

            <View
                style={[
                    styles.columna,
                    styles.columna2,
                ]}
            />

            {/* ==========================
                COLUMNA 3
            =========================== */}

            <View
                style={[
                    styles.columna,
                    styles.columna3,
                ]}
            />

            {/* ==========================
                BLOQUES
            =========================== */}

            {bloques.map(
                bloque => (

                    <View
                        key={bloque.id}
                        style={[
                            styles.bloque,
                            {
                                left:
                                    bloque.x,

                                top:
                                    bloque.y,
                            },
                        ]}
                    />
                )
            )}

            {/* ==========================
                ALIEN
            =========================== */}

            <Animated.View
                style={[
                    styles.alien,
                    {
                        left:
                            alienAnimatedX,

                        bottom:
                            alienAnimatedY,
                    },
                ]}
            >

                <Image
                    source={require(
                        '../assets/alien.png'
                    )}
                    style={
                        styles.alienImage
                    }
                />

            </Animated.View>

            {/* ==========================
                BASE
            =========================== */}

            <View
                style={styles.base}
            />

            {/* ==========================
                BOTÓN SALTO IZQUIERDO
            =========================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.saltoIzquierdo,
                ]}
                onPress={saltar}
            >

                <Text
                    style={styles.texto}
                >
                    ↑
                </Text>

            </Pressable>

            {/* ==========================
                BOTÓN SALTO DERECHO
            =========================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.saltoDerecho,
                ]}
                onPress={saltar}
            >

                <Text
                    style={styles.texto}
                >
                    ↑
                </Text>

            </Pressable>

            {/* ==========================
                IZQUIERDA
            =========================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.izquierda,
                ]}
                onPressIn={izquierda}
                onPressOut={detener}
            >

                <Text
                    style={styles.texto}
                >
                    ←
                </Text>

            </Pressable>

            {/* ==========================
                DERECHA
            =========================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.derecha,
                ]}
                onPressIn={derecha}
                onPressOut={detener}
            >

                <Text
                    style={styles.texto}
                >
                    →
                </Text>

            </Pressable>

        </View>
    );
}

// ===============================
// ESTILOS
// ===============================

const styles = StyleSheet.create({

    game: {
        flex: 1,
        backgroundColor: '#102d72',
        overflow: 'hidden',
    },

    // -------------------------------
    // COLUMNAS
    // -------------------------------

    columna: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: width / 3,
        backgroundColor: '#e83b91',
    },

    columna2: {
        left: width / 3,
        backgroundColor: '#102d72',
    },

    columna3: {
        left:
            (width / 3) * 2,
        backgroundColor: '#e83b91',
    },

    // -------------------------------
    // BLOQUES
    // -------------------------------

    bloque: {
        position: 'absolute',
        width: ANCHO_BLOQUE,
        height: ALTO_BLOQUE,
        backgroundColor: '#ffd447',
        borderRadius: 5,
    },

    // -------------------------------
    // ALIEN
    // -------------------------------

    alien: {
        position: 'absolute',
    },

    alienImage: {
        width: ANCHO_ALIEN,
        height: ALTO_ALIEN,
        resizeMode: 'contain',
    },

    // -------------------------------
    // BASE
    // -------------------------------

    base: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: 70,
        backgroundColor: '#8b4512',

        borderTopWidth: 8,
        borderTopColor: '#4caf50',

        // IMPORTANTE:
        // La base NO participa de las colisiones.
    },

    // -------------------------------
    // BOTONES
    // -------------------------------

    boton: {
        position: 'absolute',
        width: 65,
        height: 65,
        borderRadius: 35,

        backgroundColor: '#444',

        justifyContent: 'center',
        alignItems: 'center',
    },

    texto: {
        color: 'white',
        fontSize: 35,
    },

    // -------------------------------
    // IZQUIERDA
    // -------------------------------

    izquierda: {
        left: 25,
        bottom: 45,
    },

    // -------------------------------
    // DERECHA
    // -------------------------------

    derecha: {
        right: 25,
        bottom: 45,
    },

    // -------------------------------
    // SALTO IZQUIERDO
    // -------------------------------

    saltoIzquierdo: {
        left: 25,
        bottom: 125,
        backgroundColor: '#28a745',
    },

    // -------------------------------
    // SALTO DERECHO
    // -------------------------------

    saltoDerecho: {
        right: 25,
        bottom: 125,
        backgroundColor: '#28a745',
    },

});