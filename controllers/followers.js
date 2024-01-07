const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

exports.getFollowers = async (req, res) => {
    try {
        // req will have token
        // fetch token
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            return res.status(200).json({
                success: true,
                message: "Followers fetched successfully",
                followers: decode.followers,
            });
            
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Verification failed"
            });
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token error"
        });
    }
};
