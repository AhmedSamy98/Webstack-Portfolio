// This file Define the User model for the MongoDB database.

// The schema includes the fields username, email, and password, with the password field being hashed using bcrypt before being saved to the database.
const mongoose = require('mongoose'); // ODM (Object Data Modeling) library for MongoDB and Node.js.
const bcrypt = require('bcryptjs'); // Library for hashing passwords using bcrypt.

// The UserSchema defines the structure of the user collection in the MongoDB database.
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Username field of type String and required.
    email: { type: String, required: true, unique: true }, // Email field of type String, required, and unique.
    password: { type: String, required: true } // Password field of type String and required.
});

// The pre-save hook is used to hash the password before saving the user to the database.
UserSchema.pre('save', async function(next) {  // Middleware function that runs before saving a document.
    if (!this.isModified('password')) { // Check if the password has been modified.
        return next(); // If the password has not been modified, skip the hashing process.
    }
    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing the password.
    this.password = await bcrypt.hash(this.password, salt); // Hash the password using the generated salt.
    next(); // Continue with the save operation.
});

// The comparePassword method is used to compare the entered password with the hashed password stored in the database.
module.exports = mongoose.model('User', UserSchema); // Export the User model.
