const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth')
const usuariosRoutes = require('./routes/usuarios');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta raiz
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando correctamente!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
