// This file contains the controller functions for managing notes.

// Importing required modules:
const Note = require('../models/Note'); // The Note model defined in Note.js .

// The getNotes function is used to get all notes for a user.
exports.getNotes = async (req, res) => { // Async function to get all notes for a user.
    try { // Try block to catch any errors that occur during the process.
        const notes = await Note.find({ user: req.user.id }); // Find all notes for the authenticated user.
        res.render('notes', { notes }); // Render the notes view with the notes data.
    } catch (err) { // Catch block to handle any errors that occur during the process.
        console.error(err.message); // Log the error message to the console.
        res.status(500).send('Server error'); // Return a 500 status code with an error message.
    }
};

// The createNote function is used to create a new note.
exports.createNote = async (req, res) => { // Async function to create a new note.
    const { content } = req.body; // Destructure the content from the request body.
    try { // Try block to catch any errors that occur during the process.
        const newNote = new Note({ content, user: req.user.id }); // Create a new note instance with the provided content and user ID.
        await newNote.save(); // Save the new note to the database.
        res.status(201).send('Note created'); // Return a 201 status code with a success message.
    } catch (err) { // Catch block to handle any errors that occur during the process.
        console.error(err.message); // Log the error message to the console.
        res.status(500).send('Server error'); // Return a 500 status code with an error message.
    }
};

// The updateNote function is used to update a note.
exports.updateNote = async (req, res) => { // Async function to update a note.
    const { content } = req.body; // Destructure the content from the request body.
    try { // Try block to catch any errors that occur during the process.
        let note = await Note.findById(req.params.id); // Find the note by ID.
        if (!note) return res.status(404).send('Note not found'); // If the note is not found, return a 404 status code with an error message.
        if (note.user.toString() !== req.user.id) { // Check if the note belongs to the authenticated user.
            return res.status(401).send('Not authorized'); // Return a 401 status code with an error message.
        }
        note = await Note.findByIdAndUpdate(req.params.id, { content }, { new: true }); // Update the note content.
        res.status(200).send('Note updated'); // Return a 200 status code with a success message.
    } catch (err) { // Catch block to handle any errors that occur during the process.
        console.error(err.message); // Log the error message to the console.
        res.status(500).send('Server error'); // Return a 500 status code with an error message.
    }
};

// The deleteNote function is used to delete a note.
exports.deleteNote = async (req, res) => { // Async function to delete a note.
    try { // Try block to catch any errors that occur during the process.
        let note = await Note.findById(req.params.id); // Find the note by ID.
        if (!note) return res.status(404).send('Note not found'); // If the note is not found, return a 404 status code with an error message.
        if (note.user.toString() !== req.user.id) { // Check if the note belongs to the authenticated user.
            return res.status(401).send('Not authorized'); // Return a 401 status code with an error message.
        }
        await Note.findByIdAndRemove(req.params.id); // Remove the note from the database.
        res.status(200).send('Note deleted'); // Return a 200 status code with a success message.
    } catch (err) { // Catch block to handle any errors that occur during the
        console.error(err.message); // Log the error message to the console.
        res.status(500).send('Server error'); // Return a 500 status code with an error message.
    }
};
