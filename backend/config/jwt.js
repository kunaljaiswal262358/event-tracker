const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY || "secretKey"

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY);
}

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
    // return decoded or throw error
}

module.exports = {generateToken, verifyToken}