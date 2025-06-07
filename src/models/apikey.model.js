const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "apikey";
const COLLECT_NAME = "apikeys";

const apiSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permission: {
        type: [String],
        required: true,
        enum: ["0000", "1111", "2222"]
    }
}, {
    timestamps: true,
    collection: COLLECT_NAME
});

module.exports = model(DOCUMENT_NAME, apiSchema);
