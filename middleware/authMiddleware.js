const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('No token');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded;
        next();
    });
}

function checkRole(roles = []) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return res.status(403).send('Access Denied');
        next();
    };
}

module.exports = { verifyToken, checkRole };
