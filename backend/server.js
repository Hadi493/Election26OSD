const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import cors

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

const DB_PATH = '../database.sqlite'; // Path to your SQLite database

let db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Endpoint to get all divisions
app.get('/api/divisions', (req, res) => {
    db.all('SELECT * FROM divisions', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ divisions: rows });
    });
});

// Endpoint to get districts by division_id
app.get('/api/districts/:division_id', (req, res) => {
    const { division_id } = req.params;
    db.all('SELECT * FROM districts WHERE division_id = ?', [division_id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ districts: rows });
    });
});

// Endpoint to get constituencies by district_id
app.get('/api/constituencies/:district_id', (req, res) => {
    const { district_id } = req.params;
    db.all('SELECT * FROM constituencies WHERE district_id = ?', [district_id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ constituencies: rows });
    });
});

// Endpoint to get constituency details by constituency_id
app.get('/api/constituency/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM constituencies WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({ constituency: row });
        } else {
            res.status(404).json({ message: 'Constituency not found' });
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Close the database connection when the Node process exits
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});
