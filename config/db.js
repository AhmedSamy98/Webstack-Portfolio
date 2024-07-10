// This file defines a function to connect to the MongoDB database and exports that function for use in the application.

// Importing required modules:
const mongoose = require('mongoose'); // ODM (Object Data Modeling) library for MongoDB and Node.js.

// Defining the connectDB function.
const connectDB = async () => { // Async function to connect to the MongoDB database.
    try { // Try block to catch any errors that occur during the connection process.
        await mongoose.connect('mongodb://localhost:27017/notes-app', { // Connect to the MongoDB database using the connection string.
            useNewUrlParser: true, // Required to avoid deprecation warnings.
            useUnifiedTopology: true // Required to avoid deprecation warnings.
        });
        console.log('MongoDB connected...'); // Log a message to the console if the connection is successful.
    } catch (err) { // Catch block to handle any errors that occur during the connection process.
        console.error(err.message); // Log the error message to the console.
        process.exit(1); // Exit the process with an error code
    }
};

// Exporting the connectDB function.
module.exports = connectDB; // Export the connectDB function for use in other files.

// This setup allows the main application to establish a database connection by calling the connectDB function, ensuring that the MongoDB connection is properly managed.