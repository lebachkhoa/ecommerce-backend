/*
    This service is no longer used for managing refresh token
    Use Redis to manage and validate fro improve performance, scalability, security 
    like token revocation reuse detection 
 */

const keytokenModel = require("../models/_keytoken.model");

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