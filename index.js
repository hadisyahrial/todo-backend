// Panggil dotenv agar bisa baca isi file .env
require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routers/todos'); // routes -> routers
const authRoutes = require('./routers/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Daftarkan routes
app.use('/api/todos', todoRoutes); 
app.use('/api/auth', authRoutes);

// Koneksi ke MongoDB Atlas pakai variabel dari .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const Task = mongoose.model('Task', { title: String, completed: Boolean });

// Endpoint CRUD
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
}); // ← ini yang tadi belum ditutup

// Jalankan server
app.listen(5000, () => console.log('🚀 Backend running on port 5000'));