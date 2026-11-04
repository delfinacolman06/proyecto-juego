module.exports = (app, db) => {

  app.get('/estadoNave/:idusuario', (req, res) => {

    const idusuario = Number(req.params.idusuario);

    if (!Number.isInteger(idusuario) || idusuario <= 0) {
      return res.status(400).json({
        mensaje: 'ID de usuario inválido'
      });
    }

    const sql = `
      SELECT
        n.nivel,
        LEAST(COALESCE(MAX(p.piezas_obtenidas), 0), 3) AS piezas,
        CASE
          WHEN COALESCE(MAX(p.piezas_obtenidas), 0) >= 3 THEN 1
          ELSE 0
        END AS completado
      FROM (
        SELECT 1 AS nivel
        UNION ALL SELECT 2
        UNION ALL SELECT 3
      ) n
      LEFT JOIN partidas p
        ON p.niveles_idnivel = n.nivel
        AND p.usuarios_idusuario = ?
      GROUP BY n.nivel
      ORDER BY n.nivel;
    `;

    db.query(sql, [idusuario], (err, resultados) => {

      if (err) {
        console.error('Error consultando piezas:', err);

        return res.status(500).json({
          mensaje: 'Error al consultar el estado de la nave'
        });
      }

      const niveles = resultados.map(resultado => ({
        nivel: Number(resultado.nivel),
        piezas: Number(resultado.piezas),
        completado: Number(resultado.completado)
      }));

      const totalPiezas = niveles.reduce(
        (total, nivel) => total + nivel.piezas,
        0
      );

      res.json({
        niveles,
        totalPiezas
      });

    });

  });

};