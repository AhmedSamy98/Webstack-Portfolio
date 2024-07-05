const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/note'));

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'register.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'notes.html')));
app.get('/create-note', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'create-note.html')));
app.get('/edit-note', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'edit-note.html')));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));