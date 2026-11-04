module.exports = (app, db) => {

    app.post('/login', (req, res) => {

        console.log('¡Llegó una solicitud de inicio de sesión!');

        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {
            return res.status(400).json({
                mensaje: 'Completá todos los campos.'
            });
        }

        const sql = `
            SELECT idusuario, nombre_usuario, mail
            FROM usuarios
            WHERE BINARY nombre_usuario = BINARY ?
            AND BINARY \`contraseña\` = BINARY ?
            LIMIT 1
        `;

        db.query(sql, [usuario.trim(), contrasena], (err, resultado) => {

            if (err) {
                console.error('Error en la consulta:', err);

                return res.status(500).json({
                    mensaje: 'Error al consultar la base de datos.'
                });
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    mensaje: 'El usuario o la contraseña son incorrectos.'
                });
            }

            res.status(200).json({
                mensaje: 'Inicio de sesión correcto.',
                idusuario: resultado[0].idusuario,
                usuario: resultado[0].nombre_usuario,
                email: resultado[0].mail
            });

        });

    });

};