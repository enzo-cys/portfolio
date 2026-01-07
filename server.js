const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir les fichiers statiques
app.use(express.static("public"));

// API : liste des projets
app.get("/api/projects", (req, res) => {
    const filepath = path.join(__dirname, "data", "projects.json");
    
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Erreur lecture:", err);
            return res.status(500).json({ error: "Erreur de lecture" });
        }
        
        try {
            const projects = JSON.parse(data);
            res.json(projects);
        } catch (parseErr) {
            console.error("Erreur parsing:", parseErr);
            res.status(500).json({ error: "Erreur de parsing JSON" });
        }
    });
});

// Route principale
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Démarrer serveur
app.listen(PORT, () => {
    console.log(`Portfolio sur https://localhost:${PORT}`);
});