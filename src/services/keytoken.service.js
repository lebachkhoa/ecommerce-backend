const keytokenModel = require("../models/keytoken.model");

const saveKeyToken = async ({ userId, refreshToken }) => {
    await keytokenModel.create({
        userId,
        refreshToken
    });
}

const findByUserId = async ({ userId }) => {
    return await keytokenModel.findOne({ userId });
}

const updateKeyToken = async (filter, update, Option) => {
    await keytokenModel.findOneAndUpdate(filter, update, Option)
}

module.exports = {
    saveKeyToken,
    findByUserId,
    updateKeyToken
};