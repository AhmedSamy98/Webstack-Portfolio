// This file defines a middleware function to authenticate users based on a JWT token stored in cookies.

// Importing required modules:
const jwt = require('jsonwebtoken'); // Library for generating and verifying JSON Web Tokens (JWT).

// Exporting the middleware function:
module.exports = function(req, res, next) { // Middleware function to authenticate users based on a JWT token.
    const token = req.cookies.token; // Get the JWT token from the request cookies.
    if (!token) { // If no token is found, return an error response.
        return res.status(401).send('No token, authorization denied'); // Return a 401 status code with an error message.
    }
    try { // Try block to verify the JWT token and extract the user information.
        const decoded = jwt.verify(token, 'yourSecretKey'); // Verify the token using the secret key and extract the user information.
        req.user = decoded.user; // Set the user information in the request object.
        next();
    } catch (err) { // Catch block to handle any errors that occur during the verification process.
        res.status(401).send('Token is not valid'); // Return a 401 status code with an error message.
    }
};

// auth.js: Middleware function that checks for a JWT token in the cookies. If the token is present and valid, it decodes the token, attaches the user information to the request object, and calls the next middleware function. If the token is missing or invalid, it sends a 401 Unauthorized response.
//This middleware ensures that only authenticated users can access certain routes or resources by validating their JWT tokens.
