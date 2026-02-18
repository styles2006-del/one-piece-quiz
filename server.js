const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('.')); // Servir les fichiers statiques (html, css, js)

// Charger les questions
const questionsPath = path.join(__dirname, 'questions.json');
let questions = [];

try {
    const data = fs.readFileSync(questionsPath, 'utf8');
    questions = JSON.parse(data);
} catch (err) {
    console.error('Erreur lors de la lecture des questions:', err);
}

// Endpoint pour récupérer toutes les questions
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// Endpoint pour récupérer 5 questions aléatoires
app.get('/api/questions/random', (req, res) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    res.json(selected);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
