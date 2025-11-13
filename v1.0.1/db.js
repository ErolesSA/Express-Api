// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // tu usuario de MySQL
  password: '',        // tu contraseña
  database: 'mi_api'  // el nombre de tu base
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;
