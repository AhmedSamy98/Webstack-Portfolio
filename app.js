// Importing required modules
const express = require('express'); // Web framework for Node.js.
const connectDB = require('./config/db'); // Module that connects to the database (details in the db.js file).
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies.
const cookieParser = require('cookie-parser'); // Middleware to parse cookies.
const path = require('path'); // Module to handle file and directory paths in Node.js.

// Creating an Express application.
const app = express(); // Creating an Express application.

// Connect to database.
connectDB();

// Setting up middleware .
app.use(bodyParser.json()); // Middleware to parse JSON bodies.
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies.
app.use(cookieParser()); // Middleware to parse cookies.

// Set static folder.
app.use(express.static(path.join(__dirname, 'frontend'))); // Middleware to serve static files.

// Routes.
app.use('/api/auth', require('./routes/auth')); // For authentication-related routes (login and registration).
app.use('/api/notes', require('./routes/note')); // For note-related routes (CRUD operations). 

// Serving different HTML files based on the requested path.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'register.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'notes.html')));
app.get('/create-note', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'create-note.html')));
app.get('/edit-note', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'edit-note.html')));

// Starting the server.
const PORT = process.env.PORT || 5000; // Setting the port (either from the PORT environment variable or defaulting to port 5000).
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Starting the server and logging a message to the console.
