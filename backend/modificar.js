module.exports = (app, db) => {

    // RUTA PARA MODIFICAR LOS DATOS DE UNA CUENTA
    app.put('/cuenta/:idusuario', (req, res) => {

        const idusuario = Number(req.params.idusuario);

        const { mail, nombre_usuario, contrasena } = req.body;

        if (!Number.isInteger(idusuario) || idusuario <= 0) {
            return res.status(400).json({
                mensaje: 'ID de usuario inválido.'
            });
        }

        if (!mail || !nombre_usuario) {
            return res.status(400).json({
                mensaje: 'Completá el correo y el nombre de usuario.'
            });
        }

        const email = mail.trim();
        const usuario = nombre_usuario.trim();

        // Comprobar que el correo o usuario no pertenezcan a otra cuenta
        const sqlBuscar = `
            SELECT idusuario
            FROM usuarios
            WHERE (mail = ? OR nombre_usuario = ?)
            AND idusuario <> ?
        `;

        db.query(sqlBuscar, [email, usuario, idusuario], (err, resultado) => {

            if (err) {
                console.error('Error al comprobar los datos:', err);
                return res.status(500).json({
                    mensaje: 'Error al comprobar los datos.'
                });
            }

            if (resultado.length > 0) {
                return res.status(409).json({
                    mensaje: 'El correo o el nombre de usuario ya están registrados.'
                });
            }

            // Si se escribió una contraseña nueva, también se actualiza
            let sqlActualizar;
            let valores;

            if (contrasena && contrasena.trim() !== '') {

                sqlActualizar = `
                    UPDATE usuarios
                    SET mail = ?, nombre_usuario = ?, \`contraseña\` = ?
                    WHERE idusuario = ?
                `;

                valores = [email, usuario, contrasena, idusuario];

            } else {

                sqlActualizar = `
                    UPDATE usuarios
                    SET mail = ?, nombre_usuario = ?
                    WHERE idusuario = ?
                `;

                valores = [email, usuario, idusuario];

            }

            db.query(sqlActualizar, valores, (err, resultadoActualizar) => {

                if (err) {
                    console.error('Error al modificar la cuenta:', err);
                    return res.status(500).json({
                        mensaje: 'No se pudieron modificar los datos.'
                    });
                }

                if (resultadoActualizar.affectedRows === 0) {
                    return res.status(404).json({
                        mensaje: 'No se encontró la cuenta.'
                    });
                }

                res.status(200).json({
                    mensaje: 'Los datos de la cuenta se modificaron correctamente.',
                    idusuario: idusuario,
                    usuario: usuario,
                    email: email
                });

            });

        });

    });

};