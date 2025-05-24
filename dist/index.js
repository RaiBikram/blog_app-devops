import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { getHostName, getVersion } from "./utils/index.js";
import fs from "node:fs";
dotenv.config();
const app = express();
app.set("view engine", "ejs");
let dbUser = process.env.DB_USER;
let dbPASSWORD = process.env.DB_PASSWORD;
if (!dbUser && process.env.DB_USER_USER_FILE) {
    dbUser = fs.readFileSync(process.env.DB_USER_USER_FILE, "utf8").trim();
}
if (!dbPASSWORD && process.env.DB_USER_FILE) {
    dbPASSWORD = fs.readFileSync(process.env.DB_USER_FILE, "utf8").trim();
}
import dns from 'dns/promises';
async function testDNS() {
    try {
        const addresses = await dns.lookup('blog-db');
        console.log('Resolved blog-db to:', addresses);
    }
    catch (err) {
        console.error('DNS lookup failed:', err);
    }
}
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: dbUser,
    password: dbPASSWORD,
    database: process.env.DB_NAME,
});
// Root path: simple welcome message
app.get("/", (req, res) => {
    res.send("Welcome to Blog");
});
// blogs path: fetch and render blog data
app.get("/blogs", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT title, description FROM blogs");
        res.render("index", {
            blogs: rows,
            version: getVersion(),
            host: process.env.NODE_HOST || getHostName(),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving blog posts");
    }
});
// app.get("/blogs", async (req, res) => {
//   try {
//     console.log("Connecting to DB with:", {
//       host: process.env.DB_HOST,
//       user: dbUser,
//       database: process.env.DB_NAME,
//     });
//     const [rows] = await pool.query("SELECT title, description FROM blogs");
//     console.log("DB query returned rows:", rows);
//     res.render("index", {
//       blogs: rows,
//       version: getVersion(),
//       host: process.env.NODE_HOST || getHostName(),
//     });
//   } catch (error:any) {
//     console.error("Error in /blogs:", error);  // Log the full error here
//     res.status(500).send(`Error retrieving blog posts: ${error.message}`);
//   }
// });
// async function connectWithRetry(pool:any, retries = 5, delay = 2000) {
//   for (let i = 0; i < retries; i++) {
//     try {
//       await pool.query('SELECT 1'); // simple test query
//       console.log('DB connection successful');
//       return;
//     } catch (err:any) {
//       console.warn(`DB connection failed (attempt ${i + 1}): ${err.message}`);
//       if (i === retries - 1) throw err;
//       await new Promise(r => setTimeout(r, delay));
//     }
//   }
// }
app.get("/health", (req, res) => {
    console.log("Checking health through endpoint...");
    res.json({ alive: true });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
