const JWT = require("jsonwebtoken");

const generateToken = (userId, sessionId, privateKey) => {
    const accessToken = JWT.sign(
        { userId, sessionId },      // payload
        privateKey,                 // RSA private key
        {
            algorithm: "RS256",
            expiresIn: "1h"
        }
    );

    const refreshToken = JWT.sign(
        { userId, sessionId },      // payload
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "7d"
        }
    );

    return { accessToken, refreshToken }
}

module.exports = generateToken;

