import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { getHostName, getVersion } from "./utils/index.js";
dotenv.config();
const app = express();
app.set('view engine', 'ejs');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
// Root path: simple welcome message
app.get('/', (req, res) => {
    res.send('Welcome to Blog');
});
// /blogs path: fetch and render blog data
app.get('/blogs', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT title, description FROM blogs');
        res.render('index', {
            blogs: rows,
            version: getVersion(),
            host: process.env.NODE_HOST || getHostName(),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving blog posts');
    }
});
app.get('/health', (req, res) => {
    console.log('Checking health through endpoint...');
    res.json({ alive: true });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
