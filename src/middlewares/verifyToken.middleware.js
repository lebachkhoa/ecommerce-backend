const JWT = require("jsonwebtoken");
const keytokenModel = require("../models/keytoken.model");

const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            return res.status(403).json({
                message: "Acces Token is missing"
            });
        }

        // decode token to read userID in payload
        const decoded = JWT.decode(accessToken);
        if (!decoded?.userId) {
            return res.status(401).json({
                message: "Invalid Token Payload"
            });
        }

        // read public key on database to verify token
        const findByUserId = await keytokenModel.findOne({ user: decoded.userId });
        if (!findByUserId.publicKey) {
            return res.status(401).json({
                message: "Public key not found"
            });
        }

        // verify token
        const verified = JWT.verify(accessToken, findByUserId.publicKey, {
            algorithms: ["RS256"]
        });

        // attach user infor to req
        req.user = verified;
        next();

    } catch (err) {
        return res.status(401).json({
            message: err.message
        });
    }
}

module.exports = verifyToken;