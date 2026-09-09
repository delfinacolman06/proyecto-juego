import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');// toma en cuenta el tamaño de la pantalla

const COLUMNAS = 3;
const CANTIDAD_BLOQUES = 10;

const ESPACIO = 130;
const VELOCIDAD = 3;

const ANCHO_BLOQUE = width / 3 - 20;
const ALTO_BLOQUE = 30;

// ELEGIR COLUMNA
function columnaRandom() {
    return Math.floor(Math.random() * COLUMNAS);
}
// POSICIÓN HORIZONTAL
function obtenerX(columna) {
    return columna * (width / 3) + 10; //divide la pantalla en 3 partes iguales y le suma 10 para que no quede pegado al borde
}
// CREAR BLOQUES
/* function crearBloques() {

    const bloques = [];

    // Posibles formas de cada grupo
    const patrones = [
        [1, 0, 0],
        [0, 1, 1],
        [0, 0, 0],

        [1, 1, 0],
        [0, 0, 1],
        [1, 0, 0],

        [1, 0, 0],
        [0, 0, 1],
        [1, 1, 0],
    ];

    for (let i = 0; i < CANTIDAD_BLOQUES; i++) {

        // Elegimos un patrón al azar
        const patron =patrones[Math.floor(Math.random() * patrones.length)];
        // Revisamos las 3 columnas
        for (let columna = 0; columna < COLUMNAS; columna++) {
            // Si el patrón tiene un bloque
            if (patron[columna] === 1) {
                bloques.push({
                    id: i + "-" + columna,
                    x: obtenerX(columna),
                    y: -100 + (i * ESPACIO),});
            }
        }
    }
    return bloques;
} */
function crearBloques() {
    const bloques = [];
    for (let i = 0; i < CANTIDAD_BLOQUES; i++) {
        const columna = columnaRandom();
        bloques.push({
            id: i.toString(),
            x: obtenerX(columna),
            y: -100 + (i * ESPACIO),
        });
    }

    return bloques;
}
// BUSCAR COLUMNA SEGURA
/* function buscarColumnaSegura(bloques) {
    // Miramos los bloques que están más arriba
    const ultimos = bloques
        .slice()
        .sort((a, b) => a.y - b.y)
        .slice(0, 3);

    const columnasProhibidas = ultimos.map(bloque => {
        return Math.round(
            (bloque.x - 10) / (width / 3)
        );
    });

    // Elegimos solamente columnas que no estén prohibidas
    const columnasDisponibles = [];

    for (let i = 0; i < COLUMNAS; i++) {
        if (!columnasProhibidas.includes(i)) {
            columnasDisponibles.push(i);
        }
    }

    // Si todas están ocupadas/prohibidas,
    // elegimos una columna completamente al azar
    if (columnasDisponibles.length === 0) {
        return columnaRandom();
    }

    return columnasDisponibles[
        Math.floor(Math.random() * columnasDisponibles.length)
    ];
} */
// NIVEL 1
export default function Nivel1() {
    const [bloques, setBloques] = useState(
        crearBloques()
    );
    useEffect(() => {
        const intervalo = setInterval(() => {
            setBloques(bloquesActuales => {
                // sew realiza una copia
                const nuevosBloques =
                    bloquesActuales.map(bloque => ({
                        ...bloque,
                        y: bloque.y + VELOCIDAD,
                    }));

                // BLOQUES QUE SALIEROn
                nuevosBloques.forEach((bloque) => {

                    if (bloque.y > height) {

                        // Buscamos el bloque que está más arriba
                        const otrosBloques = nuevosBloques
                            .filter(b => b.id !== bloque.id)
                            .sort((a, b) => a.y - b.y);

                        const masArriba = otrosBloques[0];

                        // Lo colocamos arriba dejando espacio
                        bloque.y = masArriba.y - ESPACIO;

                        // Columna del bloque que está arriba
                        const columnaArriba = Math.round(
                            (masArriba.x - 10) / (width / 3)
                        );

                        // Elegimos una columna diferente
                        let nuevaColumna = columnaRandom();

                        while (nuevaColumna === columnaArriba) {
                            nuevaColumna = columnaRandom();
                        }
                        bloque.x = obtenerX(nuevaColumna);
                    }
                });
            return nuevosBloques;
        });

    }, 16);
    return () => { clearInterval(intervalo); };
}, []);
return (
    <View style={styles.game}>
        {/* COLUMNA 1 */}
        <View style={styles.columna} />
        {/* COLUMNA 2 */}
        <View style={[styles.columna, styles.columna2,]} />
        {/* COLUMNA 3 */}
        <View style={[styles.columna, styles.columna3,]} />
        {/* BLOQUES */}
        {bloques.map(bloque => (
            <View key={bloque.id} style={[styles.bloque, { left: bloque.x, top: bloque.y, },]} />
        ))}
        {/* ALIEN */}
        <View style={styles.alien}>
            <Image source={require('../assets/alien.png')} style={styles.alienImage} />
        </View>
        {/* BASE */}
        <View style={styles.base} />
    </View>
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
        left: (width / 3) * 2,
        backgroundColor: '#e83b91',
    },
    bloque: {
        position: 'absolute',
        width: ANCHO_BLOQUE,
        height: ALTO_BLOQUE,
        backgroundColor: '#ffd447',
        borderRadius: 5,
    },
    alien: {
        position: 'absolute',
        bottom: 100,
        left: width / 2 - 35,
    },
    alienImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
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
});
/* agregar boton "Jugar" y la base deja de ser solida */