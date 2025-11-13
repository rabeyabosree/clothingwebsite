const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "No token" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded; // user id + role
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = isAdmin;
