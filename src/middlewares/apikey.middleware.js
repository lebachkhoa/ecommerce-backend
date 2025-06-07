const apikeyModel = require("../models/apikey.model");

const HEADERS = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization"
}

const checkApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers[HEADERS.API_KEY]?.toString();
        if (!apiKey) {
            return res.status(403).json({
                message: "Forbidden error: API key missing"
            })
        }

        // check x-api-key if not in database, return
        const findByKey = await apikeyModel.findOne({ key: apiKey, status: true }).lean();
        if (!findByKey) {
            return res.status(403).json({
                message: "Forbidden error: invalid or inactive API key"
            })
        }

        // if key exists in database, pass
        req.apiKeyInfo = findByKey;
        console.log(req.apiKeyInfo);
        next();
    } catch (err) {
        return res.status(400).json({
            message: "Invalid request",
            error: err.message
        })
    }

}

// Middleware Factory pattern (Higher-Order Function for Middleware)
const checkApiPermission = (permission) => (req, res, next) => {
    const clientPermission = req.apiKeyInfo?.permission || [];
    if (!clientPermission.includes(permission)) {
        return res.status(403).json({
            message: "Permission denied"
        });
    }
    console.log(clientPermission);
    next();
}

module.exports = {
    checkApiKey,
    checkApiPermission
}