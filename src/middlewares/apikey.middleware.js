const keytokenModel = require("../models/keytoken.model");

const HEADERS = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization"
}

const checkApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers[HEADERS.API_KEY]?.toString();
        if (!apiKey) {
            return res.status(403).json({
                message: "Forbidden error"
            })
        }

        // check x-api-key if not in database, return
        const findByKey = await keytokenModel.findOne({ key: apiKey, status: true }).lean();
        if (!findByKey) {
            return res.status(403).json({
                message: "Forbidden error"
            })
        }

        // if key exists in database, pass
        req.objKey = findByKey;
        next();
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }

}

module.exports = checkApiKey;