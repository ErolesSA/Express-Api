const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM user2', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(results);
  });
});


// GET - obtener usuario por id 
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM user2 WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuario' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(results[0]);
  });
});

// POST - agregar usuario nuevo
router.post('/', (req, res) => {
  const { nombre, mail } = req.body;
  db.query('INSERT INTO user2 (nombre, mail) VALUES (?, ?)', [nombre, mail], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al insertar usuario' });
    res.status(201).json({ id: result.insertId, nombre, mail });
  });
});

// PUT - actualizar usuario por id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, mail } = req.body;
  db.query('UPDATE user2 SET nombre = ?, mail = ? WHERE id = ?', [nombre, mail, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  });
});

// DELETE - eliminar un usurio por id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM user2 WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
