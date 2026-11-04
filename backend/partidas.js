module.exports = (app, db) => {

    app.post('/partidas/guardar', (req, res) => {

        const {
            puntaje,
            piezas_obtenidas,
            progreso,
            duracion,
            usuarios_idusuario,
            niveles_idnivel
        } = req.body;

        if (
            puntaje == null ||
            piezas_obtenidas == null ||
            progreso == null ||
            duracion == null ||
            !usuarios_idusuario ||
            !niveles_idnivel
        ) {
            return res.status(400).json({
                mensaje: 'Faltan datos para guardar la partida'
            });
        }

        const sql = `
            INSERT INTO partidas
            (puntaje, piezas_obtenidas, progreso, duracion,
            usuarios_idusuario, niveles_idnivel)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            puntaje,
            piezas_obtenidas,
            progreso,
            duracion,
            usuarios_idusuario,
            niveles_idnivel
        ], (error, resultado) => {

            if (error) {
                console.log(error);

                return res.status(500).json({
                    mensaje: 'Error al guardar la partida'
                });
            }

            res.json({
                mensaje: 'Partida guardada correctamente',
                idpartida: resultado.insertId
            });
        });
    });

};