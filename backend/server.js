const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({

host: 'localhost',
    user: 'root',
    password: 'admin200804',
    database: 'juegoup',
    port: 3306

});

db.connect((err) => {

if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }

    console.log('Conectado a MySQL');

});

// Cargar rutas
require('./login')(app, db);
require('./registrar')(app, db);
require('./eliminar')(app, db);
require('./modificar')(app, db);
require('./ranking')(app, db);
require('./partidas')(app, db);
require('./estadoNave')(app, db);
// Ruta para comprobar el servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Iniciar Express
app.listen(3000, '0.0.0.0', () => {
    console.log('Server corriendo en puerto 3000');
});