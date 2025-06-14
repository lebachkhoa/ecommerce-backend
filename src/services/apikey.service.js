const apikeyModel = require("../models/apikey.model");

const findByKey = async (apiKey) => {
    return await apikeyModel.findOne({ key: apiKey, status: true }).lean();
}

module.exports = findByKey;