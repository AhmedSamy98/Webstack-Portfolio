const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('No token, authorization denied');
    }
    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).send('Token is not valid');
    }
};
