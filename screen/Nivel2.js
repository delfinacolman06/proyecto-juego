import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

const ANCHO_ALIEN = 70;
const ALTO_ALIEN = 70;
const ANCHO_BLOQUE = width / 3 - 20;
const ALTO_BLOQUE = 25;
const ESPACIO = 110;
const CANTIDAD_BLOQUES = 8;

const GRAVEDAD = 0.5;
const FUERZA_SALTO = -12;
const VELOCIDAD_ALIEN = 6;
const VELOCIDAD_PANTALLA = 3;
/* 
const COLORES = [
    '#FF5E5B',
    '#D81159',
    '#FFBC42',
    '#0496FF',
    '#00F5D4',
]; */
const COLORES = ['#346f9f'];
const PUNTOS_BLOQUE = 2;
const PUNTOS_MONEDA = 5;
const PUNTOS_CRISTAL = 10;
const PUNTOS_LLAVE = 20;
const PUNTOS_PIEZA = 30;

const IMAGENES_OBJETOS = {
    moneda: require('../assets/moneda.png'),
    cristal: require('../assets/cristal.png'),
    llave: require('../assets/llaveInglesa.png'),
    pieza1: require('../assets/metal_n2.png'),
    pieza2: require('../assets/panelrojoizq_n2.png'),
    pieza3: require('../assets/panelrojoder_n2.png'),
};

function crearBonus() {
    const azar = Math.random();
    if (azar < 0.35) {
        return { tipo: 'moneda', puntos: PUNTOS_MONEDA };
    }
    if (azar < 0.47) {
        return { tipo: 'cristal', puntos: PUNTOS_CRISTAL };
    }
    if (azar < 0.52) {
        return { tipo: 'llave', puntos: PUNTOS_LLAVE };
    }
    return null;
}
function tiempoAleatorio() {
    return 8000 + Math.random() * 4000;
}
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
        x: 0,
        y: height - 90,
        width: width,
        height: 130,
        color: '#879cd2',
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
            objeto: crearBonus(),
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

export default function Nivel2({ navigation, route }) {
    const cuenta = route.params?.cuenta;
    const [plataformas, setPlataformas] = useState(crearPlataformas);
    const [jugador, setJugador] = useState(crearJugador);
    const [activo, setActivo] = useState(false);
    const [perdio, setPerdio] = useState(false);
    const [puntos, setPuntos] = useState(0);
    //para pausar el juego
    const [pausado, setPausado] = useState(false);
    const [cuentaRegresiva, setCuentaRegresiva] = useState(null);
    const [confirmarAbandono, setConfirmarAbandono] = useState(false);
    //estado para el contador de objetos y tiempo
    const [objetos, setObjetos] = useState(0);
    const [tiempo, setTiempo] = useState(0);
    const [completado, setCompletado] = useState(false);

    const objetosRef = useRef(0);
    const tiempoRef = useRef(0);
    const siguientePiezaRef = useRef(0);
    const piezasRecogidasRef = useRef([]);

    const progresoRef = useRef(0);
    const partidaGuardadaRef = useRef(false);

    const jugadorRef = useRef(jugador);
    const plataformasRef = useRef(plataformas);
    const direccionRef = useRef(0);
    const puntosRef = useRef(0);
    const ultimaColumnaRef = useRef(-1);

    function comenzarJuego() {
        const nuevasPlataformas = crearPlataformas();
        const nuevoJugador = crearJugador();
        objetosRef.current = 0;
        tiempoRef.current = 0;
        piezasRecogidasRef.current = [];
        siguientePiezaRef.current = Date.now() + tiempoAleatorio();
        progresoRef.current = 0;
        partidaGuardadaRef.current = false;

        jugadorRef.current = nuevoJugador;
        plataformasRef.current = nuevasPlataformas;
        direccionRef.current = 0;
        puntosRef.current = 0;
        ultimaColumnaRef.current = -1;

        setObjetos(0);
        setTiempo(0);
        setCompletado(false);
        setJugador(nuevoJugador);
        setPlataformas(nuevasPlataformas);
        setPuntos(0);
        setPerdio(false);
        setPausado(false);
        setCuentaRegresiva(null);
        setActivo(true);
    }
    function pausarJuego() {
        setPausado(true);
        setCuentaRegresiva(null);
        direccionRef.current = 0;
    }

    function reanudarJuego() {
        setCuentaRegresiva(3);
    }

    function mostrarTiempo(ms) {
        const minutos = Math.floor(ms / 60000);
        const segundos = Math.floor((ms % 60000) / 1000);
        const milisegundos = ms % 1000;

        return (
            `${String(minutos).padStart(2, '0')}:` +
            `${String(segundos).padStart(2, '0')}.` +
            `${String(milisegundos).padStart(3, '0')}`
        );
    }

    useEffect(() => {
        if (!activo || pausado) return;

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
            // Generar una pieza obligatoria cada cierto tiempo.
            const hayPieza = nuevasPlataformas.some(
                p => p.objeto && p.objeto.tipo === 'pieza'
            );

            if (
                objetosRef.current < 3 &&
                !hayPieza &&
                Date.now() >= siguientePiezaRef.current) {
                const candidatas = nuevasPlataformas.filter(p =>
                    p.id !== 'base' &&
                    !p.objeto &&
                    p.y > 60 &&
                    p.y < nuevoJugador.y - 80
                );

                if (candidatas.length > 0) {
                    const plataforma = candidatas[
                        Math.floor(Math.random() * candidatas.length)
                    ];

                    const numeroPieza = objetosRef.current;

                    plataforma.objeto = {
                        tipo: 'pieza',
                        numero: numeroPieza,
                        puntos: PUNTOS_PIEZA,
                    };
                }

                siguientePiezaRef.current = Date.now() + tiempoAleatorio();
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

            // Si el alien cae fuera de la pantalla, termina la partida
            if (nuevoJugador.y > height) {
                setActivo(false);
                setPerdio(true);
                direccionRef.current = 0;
                return;
            }
            for (const plataforma of nuevasPlataformas) {
                if (!plataforma.objeto) continue;

                const objetoX = plataforma.x + plataforma.width / 2 - 15;
                const objetoY = plataforma.y - 38;

                const tocaObjeto =
                    nuevoJugador.x + ANCHO_ALIEN > objetoX &&
                    nuevoJugador.x < objetoX + 30 &&
                    nuevoJugador.y + ALTO_ALIEN > objetoY &&
                    nuevoJugador.y < objetoY + 30;

                if (!tocaObjeto) continue;

                const objeto = plataforma.objeto;

                puntosRef.current += objeto.puntos;
                setPuntos(puntosRef.current);

                plataforma.objeto = null;

                if (objeto.tipo === 'pieza') {
                    objetosRef.current += 1;
                    setObjetos(objetosRef.current);
                    siguientePiezaRef.current = Date.now() + tiempoAleatorio();
                    piezasRecogidasRef.current.push(objeto.numero);

                    if (objetosRef.current === 3) {
                        setActivo(false);
                        setCompletado(true);
                        direccionRef.current = 0;

                        if (!partidaGuardadaRef.current) {
                            partidaGuardadaRef.current = true;

                            fetch('http://10.0.10.146:3000/partidas/guardar', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    puntaje: puntosRef.current,
                                    piezas_obtenidas: objetosRef.current,
                                    progreso: progresoRef.current,
                                    duracion: Math.floor(tiempoRef.current / 1000),
                                    usuarios_idusuario: cuenta.idusuario,
                                    niveles_idnivel: 2
                                })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log('Resultado del guardado:', data);
                                })
                                .catch(error => {
                                    console.log('Error al guardar la partida:', error);
                                });
                        }
                    }
                }
            }

            // Eliminar plataformas que salieron por abajo.
            // Eliminar plataformas que salieron por abajo.
            const cantidadAntes = nuevasPlataformas.length;

            const plataformasEliminadas = nuevasPlataformas.filter(
                p => p.id !== 'base' && p.y >= height
            ).length;

            nuevasPlataformas = nuevasPlataformas.filter(
                p => p.y < height
            );

            progresoRef.current += plataformasEliminadas;

            if (plataformasEliminadas > 0) {
                puntosRef.current += plataformasEliminadas * PUNTOS_BLOQUE;
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
                    objeto: crearBonus(),
                });
            }

            jugadorRef.current = nuevoJugador;
            plataformasRef.current = nuevasPlataformas;

            setJugador({ ...nuevoJugador });
            setPlataformas([...nuevasPlataformas]);
        }, 16);

        return () => clearInterval(intervalo);
    }, [activo, pausado]);

    useEffect(() => {
        if (!activo || pausado) return;

        const intervaloTiempo = setInterval(() => {
            tiempoRef.current += 10;
            setTiempo(tiempoRef.current);
        }, 10);

        return () => clearInterval(intervaloTiempo);
    }, [activo, pausado]);


    useEffect(() => {
        if (cuentaRegresiva === null) return;

        const tiempo = setTimeout(() => {
            if (cuentaRegresiva === 1) {
                setCuentaRegresiva(null);
                setPausado(false);
            } else {
                setCuentaRegresiva(cuentaRegresiva - 1);
            }
        }, 1000);

        return () => clearTimeout(tiempo);
    }, [cuentaRegresiva]);
    return (
        <ImageBackground source={require('../assets/fondo-nivel2.jpg')} style={styles.game} >
            <View style={[styles.columna, { left: 0 }]} />
            <View style={[styles.columna, { left: width / 3, backgroundColor: 'transparent' },]} />
            <View style={[styles.columna, { left: (width / 3) * 2 },]} />

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
            {plataformas.map(p => {
                if (!p.objeto) return null;
                let imagen;
                if (p.objeto.tipo === 'pieza') {
                    imagen = IMAGENES_OBJETOS[`pieza${p.objeto.numero + 1}`];
                } else {
                    imagen = IMAGENES_OBJETOS[p.objeto.tipo];
                }
                return (
                    <Image key={`objeto-${p.id}`} source={imagen}
                        style={{
                            position: 'absolute',
                            left: p.x + p.width / 2 - 15,
                            top: p.y - 38,
                            width: 30,
                            height: 30,
                            resizeMode: 'contain',
                        }}
                    />
                );
            })}
            <Image source={require('../assets/alien.png')} style={[styles.alien, { left: jugador.x, top: jugador.y, },]} />


            <View style={styles.marcador}>
                <Text style={styles.textoMarcador}>
                    Puntos: {puntos}
                </Text>
            </View>

            <View style={styles.marcadorTiempo}>
                <Text style={styles.textoMarcador}>
                    {mostrarTiempo(tiempo)}
                </Text>
            </View>

            {activo && (
                <View style={styles.marcadorObjetos}>
                    <Text style={styles.textoMarcador}>
                        Objetos: {objetos}/3
                    </Text>
                </View>
            )}

            {/* Botón de pausa */}
            {activo && !perdio && !pausado && (
                <Pressable style={styles.botonPausa} onPress={() => {
                    if (pausado) {
                        reanudarJuego();
                    } else {
                        pausarJuego();
                    }
                }}
                >
                    <Text style={styles.textoPausa}>{pausado ? '▶' : 'Ⅱ'}</Text>
                </Pressable>
            )}

            {/* Cartel de pausa y confirmación */}
            {pausado && (
                <View style={styles.capa}>
                    <View style={styles.capaPausa}>
                        {cuentaRegresiva !== null ? (
                            <Text style={styles.textoCuenta}>
                                {cuentaRegresiva}
                            </Text>
                        ) : (
                            <View style={styles.cartelPausa}>
                                {confirmarAbandono ? (
                                    <>
                                        <Text style={styles.titulo}>
                                            ¿Abandonar partida?
                                        </Text>
                                        <Text style={styles.subtitulo}>
                                            Si volvés al menú, perderás tu progreso.
                                            ¿Estás seguro?
                                        </Text>

                                        <Pressable style={styles.botonEmpezar} onPress={() => {
                                            setConfirmarAbandono(false);
                                            setPausado(false);
                                            setActivo(false);
                                            setCuentaRegresiva(null);
                                            navigation.navigate('Menu');
                                        }}
                                        >
                                            <Text style={styles.textoEmpezar}>
                                                ACEPTAR
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={styles.botonCancelar}
                                            onPress={() => setConfirmarAbandono(false)}
                                        >
                                            <Text style={styles.textoEmpezar}>
                                                CANCELAR
                                            </Text>
                                        </Pressable>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.tituloPausa}>
                                            PARTIDA EN PAUSA
                                        </Text>

                                        <Pressable
                                            style={styles.botonEmpezar}
                                            onPress={reanudarJuego}
                                        >
                                            <Text style={styles.textoEmpezar}>
                                                ▶  CONTINUAR
                                            </Text>
                                        </Pressable>

                                        <Pressable style={styles.botonCancelar} onPress={() => setConfirmarAbandono(true)}>
                                            <Text style={styles.textoEmpezar}>
                                                VOLVER AL MENÚ
                                            </Text>
                                        </Pressable>
                                    </>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            )}

            {/* Controles táctiles */}
            <Pressable style={[styles.boton, styles.izquierda]} onPressIn={() => { direccionRef.current = -1; }} onPressOut={() => { direccionRef.current = 0; }}>
                <Image source={require('../assets/botonizq.png')} style={{ width: 90, height: 90 }} />
            </Pressable>

            <Pressable style={[styles.boton, styles.derecha]} onPressIn={() => { direccionRef.current = 1; }} onPressOut={() => { direccionRef.current = 0; }}>
                <Image source={require('../assets/botonder.png')} style={{ width: 90, height: 90 }} />
            </Pressable>

            {/* Pantalla de inicio, de derrota y ganador*/}

            {completado && (
                <View style={styles.capa}>
                    <View style={styles.cartelPausa}>
                        <Text style={styles.titulo}>
                            ¡Nivel completado!
                        </Text>

                        <Text style={styles.subtitulo}>
                            Recuperaste las 3 piezas de la nave.
                            {'\n'}
                            Puntos: {puntos}
                            {'\n'}
                            Tiempo: {mostrarTiempo(tiempo)}
                        </Text>

                        <Pressable
                            style={styles.botonEmpezar}
                            onPress={() => navigation.navigate('Niveles', { cuenta: cuenta })}
                        >
                            <Text style={styles.textoEmpezar}>
                                CONTINUAR
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.botonCancelar}
                            onPress={() => navigation.navigate('Menu', { cuenta: cuenta })}
                        >
                            <Text style={styles.textoEmpezar}>
                                VOLVER AL MENÚ
                            </Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {!activo && !completado && (
                <View style={styles.capa}>
                    <View style={styles.cartelPausa}>
                        <Text style={styles.titulo}>
                            {perdio ? '¡Perdiste!' : 'UP'}
                        </Text>

                        <Text style={styles.subtitulo}>
                            {perdio
                                ? `Puntuación: ${puntos}`
                                : '¡Subí antes de que te atrape la pantalla!'}
                        </Text>
                        <Pressable style={styles.botonEmpezar} onPress={comenzarJuego} >
                            <Text style={styles.textoEmpezar}>
                                {perdio ? 'REINTENTAR' : 'EMPEZAR JUEGO'}
                            </Text>
                        </Pressable>
                        {perdio && (
                            <Pressable style={styles.btnVolver} onPress={() => navigation.navigate('Menu', { cuenta: cuenta })}>
                                <Text style={styles.textoVolver}>VOLVER AL MENÚ</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            )}
        </ImageBackground>
    );
};

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
        bottom: 75,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#1c31b8dd',
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
        backgroundColor: '#00000066',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: 320,
    },

    titulo: {
        color: '#00F5D4',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    tituloPausa: {
        color: '#00F5D4',
        fontSize: 28,
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
        backgroundColor: '#0f84c8',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
    },

    textoEmpezar: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    btnVolver: {
        backgroundColor: '#0f84c8',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 10,
    },

    textoVolver: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },

    botonPausa: {
        position: 'absolute',
        top: 55,
        left: 15,
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#111111CC',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },

    textoPausa: {
        color: 'white',
        fontSize: 27,
        fontWeight: 'bold',
    },
    capaPausa: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    textoCuenta: {
        color: '#00F5D4',
        fontSize: 76,
        fontWeight: 'bold',
    },

    textoPreparado: {
        color: 'white',
        fontSize: 18,
        marginTop: 12,
    },

    cartelPausa: {
        width: '85%',
        backgroundColor: '#172344CC',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00F5D4',
    },

    botonCancelar: {
        backgroundColor: '#333F60',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 12,
        width: '100%',
        alignItems: 'center',
    },

    marcadorTiempo: {
        position: 'absolute',
        top: 15,
        right: 12,
        backgroundColor: '#11111199',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
    },

    marcadorObjetos: {
        position: 'absolute',
        top: 90,
        left: 270,
        backgroundColor: '#111111CC',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        zIndex: 10,
    },

});