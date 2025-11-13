// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'USUARIO_DB',        // tu usuario de MySQL
  password: 'PASSWORD_DB',        // tu contraseña
  database: 'TABLE_DB'  // el nombre de tu base
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;

