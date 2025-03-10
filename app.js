import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import indexRouter from './src/routes/index.js';
// import { db } from './src/js/firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__dirname);


const app = express();
const port = 300;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'src')));

app.use('/', indexRouter);


// CRUD Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { task } = req.body;
    const docRef = await db.collection('tasks').add({ task, completed: false });
    res.json({ id: docRef.id, task, completed: false });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    await db.collection('tasks').doc(id).update({ completed });
    res.json({ id, completed });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('tasks').doc(id).delete();
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
