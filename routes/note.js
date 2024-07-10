// This file define the routing logic and import the appropriate controller functions to handle the specific operations for authentication and note management.

// Importing required modules from the 'express' package.
const express = require('express'); // Web framework for Node.js.
const router = express.Router(); // Router object of the express module.
const { getNotes, createNote, updateNote } = require('../controllers/noteController'); // Importing the getNotes, createNote, and updateNote functions from the noteController module.
const auth = require('../middleware/auth'); // Importing the auth middleware.

// Defining the routes.
router.get('/', auth, getNotes); // Route for getting all notes.
router.post('/', auth, createNote); // Route for creating a note.
router.put('/:id', auth, updateNote); // Route for updating a note.

// Exporting the router object.
module.exports = router; // Exports the router so it can be used in the main application (app.js).
