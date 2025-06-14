/*
    This Scheme is no longer used for managing refresh token
    Use Redis to manage and validate fro improve performance, scalability, security 
    like token revocation reuse detection 
 */

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "key";
const COLLECTION_NAME = "keys";

const keyTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "shop"                 // reference to _id of shops model
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema);