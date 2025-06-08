const { model, Schema} = require("mongoose");

const DOCUMENT_NAME = "shop";
const COLLECT_NAME = "shops";

// Declare the Schema of MongoDB
const shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    verify: {
        type: Boolean,
        default: false
    },
    role: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECT_NAME
});

module.exports = model(DOCUMENT_NAME, shopSchema);