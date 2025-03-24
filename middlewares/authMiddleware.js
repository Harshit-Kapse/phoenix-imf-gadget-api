const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth middleware
exports.auth = async (req, res, next) => {
    try {
        // getting token
        // we can token from cookies, body or authorization headers(Bearer <authtoken>)
        const token = req.cookies['authToken'] || req.body.token || req.headers.authorization?.split(" ")[1];

        // check token present or not
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not logged in, token missing"
            });
        }

        // verify token
        try {
            // extracting payload/user details
            const decodedPayload = await jwt.verify(token, process.env.JWT_SECRET);

            console.log(decodedPayload);

            req.user = decodedPayload;
        } catch (error) {
            // verification issues
            return res.status(401).json({
                success: false,
                message: 'Token is invalid'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}