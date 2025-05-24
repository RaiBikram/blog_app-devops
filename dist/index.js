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
app.get("/health", (req, res) => {
    console.log("Checking health through endpoint...");
    res.json({ alive: true });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
