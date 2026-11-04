module.exports = (app, db) => {

    app.get('/ranking', (req, res) => {

        const sql = `
            SELECT
                p.idpartida,
                p.puntaje,
                p.piezas_obtenidas,
                p.progreso,
                p.duracion,
                p.usuarios_idusuario,
                p.niveles_idnivel,
                u.nombre_usuario

            FROM partidas p

            INNER JOIN usuarios u
                ON p.usuarios_idusuario = u.idusuario

            WHERE NOT EXISTS (
                SELECT 1
                FROM partidas p2

                WHERE p2.usuarios_idusuario = p.usuarios_idusuario

                AND (
                    p2.puntaje > p.puntaje

                    OR (
                        p2.puntaje = p.puntaje
                        AND COALESCE(p2.duracion, 2147483647)
                            < COALESCE(p.duracion, 2147483647)
                    )

                    OR (
                        p2.puntaje = p.puntaje
                        AND COALESCE(p2.duracion, 2147483647)
                            = COALESCE(p.duracion, 2147483647)
                        AND p2.idpartida < p.idpartida
                    )
                )
            )

            ORDER BY
                p.puntaje DESC,
                COALESCE(p.duracion, 2147483647) ASC,
                p.idpartida ASC
        `;

        db.query(sql, (err, resultado) => {

            if (err) {
                console.error('ERROR AL OBTENER RANKING:', err);

                return res.status(500).json({
                    mensaje: 'Error al consultar las partidas.',
                    error: err.message
                });
            }

            console.log('RANKING ENVIADO:', resultado);

            res.status(200).json(resultado);

        });

    });

};