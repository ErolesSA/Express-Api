// routes/usuarios
const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middlewares/authMiddleware');

// GET - Todos los usuarios
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// GET: usuarios por ID
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario: ', error);
    res.status(500).json({ error: ' Error al obtener usuario' });
  }
});

// POST: Crear usuario
router.post('/', authMiddleware, async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const [result] = await db.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email]);
    res.status(201).json({ id: result.insertId, nombre, email });
  } catch (error) {
    console.error('Error al crear usuario; ', error);
    res.status(500).json({ error: 'Error al crear usuario.' });
  }
});

// PUT: Actualizar usuario
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const [result] = await db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id]);
    if(result.affectedRows === 0)
      return res.status(404).json({ error: 'Usuario no encontrado.'});
    res.json({ message: 'Usuario actualizado correctamente.'});
  } catch (error) {
    console.error('Error al actualizar usuario: ', error);
    res.status(500).json({ error:'Error al actualizar usuario.' })
  }
});

// DELETE: Eliminar usuario
router.delete('/:id', authMiddleware, async(req, res) => {
  const { id } = req.params;
  try{
    const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if(result.affectedRows === 0)
      return res.status>(404).json({ error: 'Usuario no encontrado.'});
    res.json({ message: 'Usuario eliminado correctamente.'});
  } catch(error){
    console.error('Error al eliminar usuario: ', error);
    res.status(500).json({ error: 'error al eliminar usuario.' });
  }
});

module.exports = router;