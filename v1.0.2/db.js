// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        
  password: '',        
  database: 'mi_api', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexion
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a la base de datos MySQL.');
    connection.release(); // liberar la conexión al pool
  } catch (err) {
    console.error('Error al conectarse a la base de datos MySQL:', err);
  }
})();

module.exports = pool;
