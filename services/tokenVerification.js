import jwt from "jsonwebtoken"
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookie

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user data to request
        next(); // Proceed to protected route
    } catch (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};