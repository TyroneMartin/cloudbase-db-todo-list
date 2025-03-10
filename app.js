import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import indexRouter from './src/routes/index.js';
import { db } from './src/js/firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));
app.use('/', indexRouter);

// CRUD operations
app.get('/api/tasks', async (req, res) => {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { task } = req.body;
    const docRef = await db.collection('tasks').add({ task, completed: false });
    res.json({ id: docRef.id, task, completed: false });
  } catch (error) {
    console.error('Error adding task:', error);
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
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/tasks/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: 'Task name is required' });
    }

    await db.collection('tasks').doc(id).update({ task });
    res.json({ id, task });
  } catch (error) {
    console.error('Error updating task name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('tasks').doc(id).delete();
    res.json({ id });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});