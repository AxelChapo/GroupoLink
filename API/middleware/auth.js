const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        const admin = decodedToken.admin;
        req.auth = {
            userId,
            admin
        };
    next();
    } catch {
        res.status(401).json({
            error: 'Invalid token'
        });
    }
};