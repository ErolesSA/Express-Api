//auth.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpires } = require('../config');

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );

    res.status(201).json({ mensaje: 'Usuario registrado', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el registro' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });

    const usuario = rows[0];

    // Verificar password
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch)
      return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Crear token
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre },
      jwtSecret,
      { expiresIn: jwtExpires }
    );

    res.json({ mensaje: 'Login exitoso', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
});

module.exports = router;
