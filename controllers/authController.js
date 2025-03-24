const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// register a user
exports.registerUser = async (req, res) => {
    try {
        // taking data from request body
        const { email, password } = req.body;

        // check if user exist or not
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // create new user, if user doesn't exist
        const newUser = await User.create({
            email,
            password
        });

        // send reponse
        res.status(201).json({
            success: true,
            data: newUser,
            message: "User registered successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// login a user
exports.loginUser = async (req, res) => {
    try {
        // take email and password from request body
        const { email, password } = req.body;

        // check if user is registered or not
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered"
            });
        }

        // check password, if password matches with stored password corresponding to given email
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Password doesn't match"
            });
        }

        // generate jwt token
        const tokenPayload = {
            userId: user.id,
            email: user.email
        };

        const tokenOptions = {
            expiresIn: "24h"
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenOptions);

        // generate cookies
        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // send respone
        res.status(200).json({
            success: true,
            token: token,
            message: "User logged in successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// log out user
exports.logoutUser = async (req, res) => {
    try {
        // clear cookies so that jwt token ends
        res.clearCookie("authToken", {
            httpOnly: true
        });

        // send response
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}