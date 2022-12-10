const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["api-token"];

    if (!token) {
        res.status(400).json({ message: "please provide your access token" });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return  res.status(400).json({ message: "Invalid token" });
    }
    return next();
};

module.exports = verifyToken;