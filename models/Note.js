// This file defines the schema for a Note in a MongoDB database using Mongoose.


const mongoose = require('mongoose'); // ODM (Object Data Modeling) library for MongoDB and Node.js.

// The NoteSchema defines the structure of the note collection in the MongoDB database.
const NoteSchema = new mongoose.Schema({ // Define the fields of the note collection.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User field of type ObjectId, referencing the User model, and required.
    content: { type: String, required: true }, // Content field of type String and required.
    date: { type: Date, default: Date.now } // Date field of type Date with a default value of the current date and time.
});

// Export the Note model.
module.exports = mongoose.model('Note', NoteSchema);
