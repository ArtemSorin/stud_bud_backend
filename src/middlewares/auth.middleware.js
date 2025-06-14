const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Токен отсутствует' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded JWT payload:', decoded);
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({ error: 'Недействительный токен' });
    }
};
