// Importar express
const express = require('express');
const app = express()

// middleware
app.use(express.json());

// puerto del servidor
const PORT = 3000;

// Ruta raiz
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando correctamente!');
});

// Ejemplo de ruta GET
app.get('/api/usuarios', (req, res) => {
  const usuarios = [
    { id: 1, nombre: 'Juan' },
    { id: 2, nombre: 'María' },
    { id: 3, nombre: 'Pedro' }
  ];
  res.json(usuarios);
});

//Ejemplo de POST
app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    res.status(201).json({
        mensaje: 'Usuario creado exitosamente',
        usuario: nuevoUsuario
    });
});

// Levantar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});