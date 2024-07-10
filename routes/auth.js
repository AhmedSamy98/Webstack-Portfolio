//The routes for user authentication.

// Importing required modules from 'express' package.
const express = require('express'); // Web framework for Node.js.
const router = express.Router(); // Router object of the express module.
const { register, login } = require('../controllers/authController'); // Importing the register and login functions from the authController module.

// Defining the routes.
router.post('/register', register); // Route for user registration.
router.post('/login', login); // Route for user login.

// Exporting the router object.
module.exports = router; // Exports the router so it can be used in the main application (app.js).
