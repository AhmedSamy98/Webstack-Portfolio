// This file contains the logic for user registration and login.

// Importing required modules:
const User = require('../models/User'); // The User model defined in User.js .
const bcrypt = require('bcryptjs'); // Library for hashing passwords using bcrypt.
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens (JWT).

// The register function is used to register a new user.
exports.register = async (req, res) => { // Async function to handle user registration.
    const { username, email, password } = req.body; // Destructure the username, email, and password from the request body.
    try { // Try block to catch any errors that occur during the registration process.
        let user = await User.findOne({ email }); // Check if a user with the provided email already exists.
        if (user) { // If a user with the provided email already exists, return an error response.
            return res.status(400).send('User already exists'); // Return a 400 status code with an error message.
        } 
        user = new User({ username, email, password }); // Create a new user instance with the provided username, email, and password.
        await user.save(); // Save the new user to the database.
        res.status(201).send('User registered'); // Return a 201 status code with a success message.
    } catch (err) { // Catch block to handle any errors that occur during the registration process.
        console.error(err.message); // Log the error message to the console.
        res.status(500).send('Server error'); // Return a 500 status code with an error message.
    }
};

// The login function is used to authenticate a user and generate a JWT token.
exports.login = async (req, res) => { // Async function to handle user login.
    const { email, password } = req.body; // Destructure the email and password from the request body.
    try { // Try block to catch any errors that occur during the login process.
        let user = await User.findOne({ email }); // Find a user with the provided email in the database.
        if (!user) { // If no user is found with the provided email, return an error response.
            return res.status(400).send('Invalid credentials'); // Return a 400 status code with an error message.
        }
        const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password stored in the database.
        if (!isMatch) { // If the passwords do not match, return an error response.
            return res.status(400).send('Invalid credentials'); // Return a 400 status code with an error message.
        }
        const payload = { user: { id: user.id }}; // Create a payload containing the user ID.
        jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => { // Generate a JWT token with the payload and a secret key.
            if (err) throw err; // Throw an error if the token generation fails.
            res.cookie('token', token, { httpOnly: true }); // Set the token as a cookie in the response.
            res.status(200).send('Logged in'); // Return a 200 status code with a success message.
        });
    } catch (err) { // Catch block to handle any errors that occur during the login process.
        console.error(err.message); // Log the error message to the console.
        res.status(500).send('Server error'); // Return a 500 status code with an error message.
    }
};
