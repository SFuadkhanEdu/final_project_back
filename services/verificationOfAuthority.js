import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const verificationOfAuthority = (req, res, next) => {
    console.log("verification started");
    
    const token = req.cookies.token; // Get token from cookies
    console.log("token: ", token);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // First verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Check if user is an admin
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: No access for this request" });
        }

        req.user = decoded; // Attach user data to request
        next(); // Proceed to protected route
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
