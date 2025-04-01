const { get_query_database } = require("../config/database_utils");

const validate_user = async (req, res) => {
    try {
        const { username, password } = req.query;
        console.log(username,password);

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const query = `SELECT name FROM users WHERE user_name = ? AND password = ? AND status = 1`;
        const data = await get_query_database(query, [username, password]);

        if (data.length > 0) {
            res.status(200).json({ name: data[0].name });
        } else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Error validating user:", err);
        res.status(500).json({
            error: "Error validating user"
        });
    }
};

module.exports = { validate_user };