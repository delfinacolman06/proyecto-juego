module.exports = (app, db) => {

    app.delete('/cuenta/:idusuario', (req, res) => {

        const idusuario = req.params.idusuario;

        if (!idusuario || isNaN(idusuario)) {
            return res.status(400).json({
                mensaje: 'ID de usuario inválido.'
            });
        }

        const sql = `
            DELETE FROM usuarios
            WHERE idusuario = ?
        `;

        db.query(sql, [idusuario], (err, resultado) => {

            if (err) {
                console.error('Error al eliminar la cuenta:', err);

                return res.status(500).json({
                    mensaje: 'No se pudo eliminar la cuenta.'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: 'No se encontró la cuenta.'
                });
            }

            res.status(200).json({
                mensaje: 'Cuenta eliminada correctamente.'
            });

        });

    });

};