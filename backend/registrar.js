module.exports = (app, db) => {

    app.post('/registro', (req, res) => {

        const { email, usuario, contrasena } = req.body;

        // Verificar campos vacíos
        if (
            !email ||
            !usuario ||
            !contrasena
        ) {
            return res.status(400).json({
                mensaje: 'Completá todos los campos.'
            });
        }

        // Buscar si alguno de los datos ya existe
        const sqlBuscar = `
            SELECT mail, nombre_usuario, contraseña
            FROM usuarios
            WHERE BINARY mail = ?
               OR BINARY nombre_usuario = ?
               OR BINARY contraseña = ?
        `;

        db.query(
            sqlBuscar,
            [email, usuario, contrasena],
            (err, resultado) => {

                if (err) {
                    console.error('Error al verificar los datos:', err);

                    return res.status(500).json({
                        mensaje: 'Error al verificar los datos.'
                    });
                }

                // Crear lista de errores
                const errores = [];

                resultado.forEach((registro) => {

                    // Verificar usuario repetido
                    if (
                        registro.nombre_usuario === usuario &&
                        !errores.includes('Este nombre de usuario ya existe.')
                    ) {
                        errores.push('Este nombre de usuario ya existe.');
                    }

                    // Verificar mail repetido
                    if (
                        registro.mail === email &&
                        !errores.includes('Este mail ya existe.')
                    ) {
                        errores.push('Este mail ya existe.');
                    }

                    // Verificar contraseña repetida
                    if (
                        registro.contraseña === contrasena &&
                        !errores.includes('Esta contraseña ya existe.')
                    ) {
                        errores.push('Esta contraseña ya existe.');
                    }

                });

                // Si hay datos repetidos, no registrar
                if (errores.length > 0) {
                    return res.status(409).json({
                        errores: errores
                    });
                }

                // Insertar nuevo usuario
                const sqlInsertar = `
                    INSERT INTO usuarios
                    (mail, nombre_usuario, contraseña)
                    VALUES (?, ?, ?)
                `;

                db.query(
                    sqlInsertar,
                    [email, usuario, contrasena],
                    (err, resultadoInsertar) => {

                        if (err) {
                            console.error('Error al registrar:', err);

                            return res.status(500).json({
                                mensaje: 'No se pudo registrar el usuario.'
                            });
                        }

                        res.status(201).json({
                            mensaje: 'Usuario registrado correctamente.',
                            id: resultadoInsertar.insertId
                        });

                    }
                );

            }
        );
    });
};