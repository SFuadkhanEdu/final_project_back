

  // Ensure the path matches the path where cookie was set
export const clearCookies = (req, res) => {
    try {
        res.clearCookie("token", { path: "/" });
    } catch (err) {
        res.status(400).json({ message: "Error while logging out" });
    }
};