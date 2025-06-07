const { Schema, Model, default: mongoose } = require("mongoose");

const DOCUMENT_NAME = "key";
const COLLECTION_NAME = "keys";

const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "shop"                 // reference to _id of shops model
    },
    publicKey: {
        type: String,
        required: true
    },
    refreshToken: {
        type: Array,
        default: []
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);