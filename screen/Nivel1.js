import React, { useEffect, useRef } from 'react';
import {View,Image,StyleSheet,Pressable,Text,Animated} from 'react-native';

export default function Nivel1() {

    // POSICIÓN DEL ALIEN
    const x = useRef(50);
    const y = useRef(180);

    // VELOCIDAD
    const velocidadX = useRef(0);
    const velocidadY = useRef(0);

    // SABER SI ESTÁ APOYADO
    const enElSuelo = useRef(true);

    // ANIMACIÓN
    const alienX = useRef(new Animated.Value(50)).current;
    const alienY = useRef(new Animated.Value(180)).current;

    // CONFIGURACIÓN
    const VELOCIDAD = 6;
    const SALTO = 14;
    const GRAVEDAD = 0.7;

    // POSICIÓN DEL SUELO
    const SUELO = 180;

    // DATOS DEL BLOQUE
    const bloque = {
        x: 50,
        y: 130,
        ancho: 200,
        alto: 30
    };

    useEffect(() => {

        const actualizar = () => {

            // =========================
            // MOVIMIENTO HORIZONTAL
            // =========================

            x.current += velocidadX.current;


            // =========================
            // GRAVEDAD Y MOVIMIENTO VERTICAL
            // =========================

            if (!enElSuelo.current) {

                velocidadY.current -= GRAVEDAD;

                y.current += velocidadY.current;


                // =========================
                // COLISIÓN CON EL BLOQUE
                // =========================

                const alienIzquierda = x.current;
                const alienDerecha = x.current + 70;

                const bloqueIzquierda = bloque.x;
                const bloqueDerecha =
                    bloque.x + bloque.ancho;

                const alienAbajo = y.current;

                const bloqueArriba =
                    bloque.y + bloque.alto;


                if (
                    alienDerecha > bloqueIzquierda &&
                    alienIzquierda < bloqueDerecha &&
                    alienAbajo <= bloqueArriba &&
                    alienAbajo >= bloque.y &&
                    velocidadY.current <= 0
                ) {

                    // El alien queda arriba del bloque
                    y.current = bloqueArriba;

                    // Detenemos la caída
                    velocidadY.current = 0;

                    // Ahora está apoyado
                    enElSuelo.current = true;
                }


                // =========================
                // COLISIÓN CON EL SUELO
                // =========================

                if (y.current <= SUELO) {

                    y.current = SUELO;

                    velocidadY.current = 0;

                    enElSuelo.current = true;
                }
            }


            // =========================
            // ACTUALIZAR ALIEN
            // =========================

            alienX.setValue(x.current);
            alienY.setValue(y.current);


            // VOLVER A EJECUTAR
            requestAnimationFrame(actualizar);
        };


        const animacion =
            requestAnimationFrame(actualizar);


        return () => cancelAnimationFrame(animacion);

    }, []);


    // =========================
    // MOVIMIENTO IZQUIERDA
    // =========================

    const izquierda = () => {
        velocidadX.current = -VELOCIDAD;
    };


    // =========================
    // MOVIMIENTO DERECHA
    // =========================

    const derecha = () => {
        velocidadX.current = VELOCIDAD;
    };


    // =========================
    // DETENER MOVIMIENTO
    // =========================

    const detener = () => {
        velocidadX.current = 0;
    };


    // =========================
    // SALTAR
    // =========================

    const saltar = () => {

        if (enElSuelo.current) {

            velocidadY.current = SALTO;

            enElSuelo.current = false;
        }
    };


    return (

        <View style={styles.game}>

            {/* =========================
                ALIEN
            ========================= */}

            <Animated.View
                style={[
                    styles.alien,
                    {
                        left: alienX,
                        bottom: alienY
                    }
                ]}
            >

                <Image
                    source={require('../assets/alien.png')}
                    style={styles.alienImage}
                />

            </Animated.View>


            {/* =========================
                BLOQUE
            ========================= */}

            <View style={styles.bloque}>

                <Image
                    source={require('../assets/bloque.avif')}
                    style={styles.bloqueImage}
                />

            </View>


            {/* =========================
                BOTÓN SALTAR IZQUIERDO
            ========================= */}

            <Pressable
                style={[
                    styles.boton,
                    styles.saltoIzquierdo
                ]}
                onPress={saltar}
            >

                <Text style={styles.texto}>
                    ↑
                </Text>

            </Pressable>


            {/* =========================
                BOTÓN SALTAR DERECHO
            ========================= */}

            <Pressable
                style={[
                    styles.boton,
                    styles.saltoDerecho
                ]}
                onPress={saltar}
            >

                <Text style={styles.texto}>
                    ↑
                </Text>

            </Pressable>


            {/* =========================
                BOTÓN IZQUIERDA
            ========================= */}

            <Pressable
                style={[
                    styles.boton,
                    styles.izquierda
                ]}
                onPressIn={izquierda}
                onPressOut={detener}
            >

                <Text style={styles.texto}>
                    ←
                </Text>

            </Pressable>


            {/* =========================
                BOTÓN DERECHA
            ========================= */}

            <Pressable
                style={[
                    styles.boton,
                    styles.derecha
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


// =========================
// ESTILOS
// =========================

const styles = StyleSheet.create({

    game: {
        flex: 1,
        backgroundColor: '#102d72',
        overflow: 'hidden',
    },


    // ALIEN
    alien: {
        position: 'absolute',
    },

    alienImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },


    // BLOQUE
    bloque: {
        position: 'absolute',
        bottom: 130,
        left: 50,
        width: 200,
        height: 30,
    },

    bloqueImage: {
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    },


    // BOTONES
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


    // IZQUIERDA
    izquierda: {
        left: 25,
        bottom: 45,
    },


    // DERECHA
    derecha: {
        right: 25,
        bottom: 45,
    },


    // SALTO IZQUIERDO
    saltoIzquierdo: {
        left: 25,
        bottom: 125,
        backgroundColor: '#28a745',
    },


    // SALTO DERECHO
    saltoDerecho: {
        right: 25,
        bottom: 125,
        backgroundColor: '#28a745',
    },

});