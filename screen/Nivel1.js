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

// ==========================================
// CONFIGURACIÓN
// ==========================================

const COLUMNAS = 3;
const CANTIDAD_BLOQUES = 10;

const ESPACIO = 130;
const VELOCIDAD_BLOQUES = 3;

const ANCHO_BLOQUE = width / 3 - 20;
const ALTO_BLOQUE = 30;

// ==========================================
// ALIEN
// ==========================================

const ANCHO_ALIEN = 70;
const ALTO_ALIEN = 70;

const VELOCIDAD_ALIEN = 6;
const FUERZA_SALTO = 14;
const GRAVEDAD = 0.7;

// ==========================================
// COLUMNAS
// ==========================================

function columnaRandom() {
    return Math.floor(Math.random() * COLUMNAS);
}

function obtenerX(columna) {
    return columna * (width / 3) + 10;
}

// ==========================================
// CREAR BLOQUES
// ==========================================

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

// ==========================================
// NIVEL
// ==========================================

export default function Nivel1() {

    // ======================================
    // BLOQUES
    // ======================================

    const [bloques, setBloques] = useState(
        crearBloques()
    );

    const bloquesRef = useRef(bloques);

    useEffect(() => {
        bloquesRef.current = bloques;
    }, [bloques]);

    // ======================================
    // POSICIÓN DEL ALIEN
    // TODO EN "TOP"
    // ======================================

    const alienX = useRef(
        width / 2 - ANCHO_ALIEN / 2
    );

    const alienY = useRef(
        height - 170
    );

    // ======================================
    // VELOCIDADES
    // ======================================

    const velocidadX = useRef(0);
    const velocidadY = useRef(0);

    // ======================================
    // ESTADO DEL ALIEN
    // ======================================

    const enElSuelo = useRef(false);
    const sobreBloque = useRef(false);

    // ======================================
    // ANIMACIONES
    // ======================================

    const alienAnimatedX = useRef(
        new Animated.Value(
            width / 2 - ANCHO_ALIEN / 2
        )
    ).current;

    const alienAnimatedY = useRef(
        new Animated.Value(
            height - 170
        )
    ).current;

    // ======================================
    // FÍSICA DEL ALIEN
    // ======================================

    useEffect(() => {

        let frame;

        const actualizar = () => {

            // ==================================
            // MOVIMIENTO HORIZONTAL
            // ==================================

            alienX.current += velocidadX.current;

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

            // ==================================
            // POSICIÓN ANTERIOR
            // ==================================

            const alienYAnterior =
                alienY.current;

            // ==================================
            // GRAVEDAD
            // ==================================

            if (!enElSuelo.current) {

                velocidadY.current += GRAVEDAD;

                alienY.current +=
                    velocidadY.current;
            }

            // ==================================
            // DATOS DEL ALIEN
            // ==================================

            const alienIzquierda =
                alienX.current;

            const alienDerecha =
                alienX.current +
                ANCHO_ALIEN;

            const alienArriba =
                alienY.current;

            const alienAbajo =
                alienY.current +
                ALTO_ALIEN;

            // ==================================
            // COLISIÓN
            // ==================================

            let aterrizo = false;

            bloquesRef.current.forEach(
                bloque => {

                    const bloqueIzquierda =
                        bloque.x;

                    const bloqueDerecha =
                        bloque.x +
                        ANCHO_BLOQUE;

                    const bloqueArriba =
                        bloque.y;

                    // --------------------------------
                    // COLISIÓN HORIZONTAL
                    // --------------------------------

                    const tocaHorizontalmente =
                        alienDerecha >
                            bloqueIzquierda &&
                        alienIzquierda <
                            bloqueDerecha;

                    // --------------------------------
                    // ALIEN ESTÁ CAYENDO
                    // --------------------------------

                    const estaCayendo =
                        velocidadY.current >= 0;

                    // --------------------------------
                    // EL ALIEN ATRAVESÓ LA SUPERFICIE
                    // --------------------------------

                    const cruzoElBloque =
                        alienYAnterior +
                            ALTO_ALIEN <=
                            bloqueArriba &&
                        alienAbajo >=
                            bloqueArriba;

                    // --------------------------------
                    // COLISIÓN FINAL
                    // --------------------------------

                    if (
                        tocaHorizontalmente &&
                        estaCayendo &&
                        cruzoElBloque
                    ) {

                        // Poner los pies exactamente
                        // encima del bloque

                        alienY.current =
                            bloqueArriba -
                            ALTO_ALIEN;

                        velocidadY.current = 0;

                        enElSuelo.current = true;

                        sobreBloque.current = true;

                        aterrizo = true;
                    }
                }
            );

            // ==================================
            // SI NO ATERRIZÓ EN UN BLOQUE
            // ==================================

            if (!aterrizo) {

                // --------------------------------
                // SUELO
                // --------------------------------

                const sueloY =
                    height - 70 - ALTO_ALIEN;

                if (
                    alienY.current >=
                    sueloY
                ) {

                    alienY.current = sueloY;

                    velocidadY.current = 0;

                    enElSuelo.current = true;

                    sobreBloque.current = false;

                } else {

                    enElSuelo.current = false;

                    sobreBloque.current = false;
                }
            }

            // ==================================
            // ACTUALIZAR ANIMACIÓN
            // ==================================

            alienAnimatedX.setValue(
                alienX.current
            );

            alienAnimatedY.setValue(
                alienY.current
            );

            frame =
                requestAnimationFrame(
                    actualizar
                );
        };

        frame =
            requestAnimationFrame(
                actualizar
            );

        return () => {
            cancelAnimationFrame(frame);
        };

    }, []);

    // ==========================================
    // MOVIMIENTO DE BLOQUES
    // ==========================================

    useEffect(() => {

        const intervalo = setInterval(() => {

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

                    // ==================================
                    // RECICLAR BLOQUES
                    // ==================================

                    nuevosBloques.forEach(
                        bloque => {

                            if (
                                bloque.y >
                                height
                            ) {

                                const otros =
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
                                    otros[0];

                                if (masArriba) {

                                    bloque.y =
                                        masArriba.y -
                                        ESPACIO;

                                    const columnaArriba =
                                        Math.round(
                                            (
                                                masArriba.x -
                                                10
                                            ) /
                                            (width / 3)
                                        );

                                    let nuevaColumna =
                                        columnaRandom();

                                    // Evitar que dos bloques
                                    // consecutivos estén
                                    // en la misma columna.

                                    let intentos = 0;

                                    while (
                                        nuevaColumna ===
                                            columnaArriba &&
                                        intentos < 10
                                    ) {

                                        nuevaColumna =
                                            columnaRandom();

                                        intentos++;
                                    }

                                    bloque.x =
                                        obtenerX(
                                            nuevaColumna
                                        );
                                }
                            }
                        }
                    );

                    bloquesRef.current =
                        nuevosBloques;

                    return nuevosBloques;
                }
            );

        }, 16);

        return () => {
            clearInterval(intervalo);
        };

    }, []);

    // ==========================================
    // CONTROLES
    // ==========================================

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
                -FUERZA_SALTO;

            enElSuelo.current = false;

            sobreBloque.current = false;
        }
    };

    // ==========================================
    // PANTALLA
    // ==========================================

    return (
        <View style={styles.game}>

            {/* ==================================
                COLUMNAS
            ================================== */}

            <View
                style={styles.columna}
            />

            <View
                style={[
                    styles.columna,
                    styles.columna2,
                ]}
            />

            <View
                style={[
                    styles.columna,
                    styles.columna3,
                ]}
            />

            {/* ==================================
                BLOQUES
            ================================== */}

            {bloques.map(bloque => (

                <View
                    key={bloque.id}
                    style={[
                        styles.bloque,
                        {
                            left: bloque.x,
                            top: bloque.y,
                        },
                    ]}
                />

            ))}

            {/* ==================================
                ALIEN
            ================================== */}

            <Animated.View
                style={[
                    styles.alien,
                    {
                        left:
                            alienAnimatedX,
                        top:
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

            {/* ==================================
                BASE
            ================================== */}

            <View
                style={styles.base}
            />

            {/* ==================================
                SALTO IZQUIERDO
            ================================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.saltoIzquierdo,
                ]}
                onPress={saltar}
            >
                <Text style={styles.texto}>
                    ↑
                </Text>
            </Pressable>

            {/* ==================================
                SALTO DERECHO
            ================================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.saltoDerecho,
                ]}
                onPress={saltar}
            >
                <Text style={styles.texto}>
                    ↑
                </Text>
            </Pressable>

            {/* ==================================
                IZQUIERDA
            ================================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.izquierda,
                ]}
                onPressIn={izquierda}
                onPressOut={detener}
            >
                <Text style={styles.texto}>
                    ←
                </Text>
            </Pressable>

            {/* ==================================
                DERECHA
            ================================== */}

            <Pressable
                style={[
                    styles.boton,
                    styles.derecha,
                ]}
                onPressIn={derecha}
                onPressOut={detener}
            >
                <Text style={styles.texto}>
                    →
                </Text>
            </Pressable>

        </View>
    );
}

// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({

    game: {
        flex: 1,
        backgroundColor: '#102d72',
        overflow: 'hidden',
    },

    // ======================================
    // COLUMNAS
    // ======================================

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

    // ======================================
    // BLOQUES
    // ======================================

    bloque: {
        position: 'absolute',
        width: ANCHO_BLOQUE,
        height: ALTO_BLOQUE,
        backgroundColor: '#ffd447',
        borderRadius: 5,
    },

    // ======================================
    // ALIEN
    // ======================================

    alien: {
        position: 'absolute',
        width: ANCHO_ALIEN,
        height: ALTO_ALIEN,
    },

    alienImage: {
        width: ANCHO_ALIEN,
        height: ALTO_ALIEN,
        resizeMode: 'contain',
    },

    // ======================================
    // BASE
    // ======================================

    base: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        height: 70,

        backgroundColor: '#8b4512',

        borderTopWidth: 8,
        borderTopColor: '#4caf50',
    },

    // ======================================
    // BOTONES
    // ======================================

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
        fontWeight: 'bold',
    },

    izquierda: {
        left: 25,
        bottom: 45,
    },

    derecha: {
        right: 25,
        bottom: 45,
    },

    saltoIzquierdo: {
        left: 25,
        bottom: 125,
        backgroundColor: '#28a745',
    },

    saltoDerecho: {
        right: 25,
        bottom: 125,
        backgroundColor: '#28a745',
    },
});