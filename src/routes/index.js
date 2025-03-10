import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


//https://to-do-list-api.onrender.com/ not yet implemented for production

// Serve index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../list/index.html'));
});

export default router;