// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET - Ambil semua todo
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Tambah todo baru
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Update todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' } // ganti { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Hapus todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;