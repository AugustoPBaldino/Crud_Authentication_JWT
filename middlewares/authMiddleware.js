const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const SECRET = 'your_secret_key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};
//a
const authorizeLevel = (level) => {
    return async (req, res, next) => {
        const user = await User.findOne({ id: req.user.id });
        if (user.level >= level) {
            next();
        } else {
            return res.sendStatus(403); // Forbidden
        }
    };
};

module.exports = { authenticateToken, authorizeLevel };
