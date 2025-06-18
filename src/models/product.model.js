/**
Polymorphic Pattern on MongoDB
Expample about payload:
{
    product_name: "T-Shirt Casual",
    product_thumb: "url_to_tshirt.jpg",
    product_description: "Comfortable cotton t-shirt.",
    product_price: 25,
    product_quantity: 100,
    product_type: "clothing",
    product_shop: "shop_id_456",
    product_attributes: {
        brand: "FashionWear",
        size: "L",
        material: "Cotton"
    }
}
**/

const { Schema, model } = require("mongoose");

const PRODUCT_DOCUMENT_NAME = "product";
const PRODUCT_COLLECTION_NAME = "products";

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_price: { type: Number, required: true, },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ["electronic", "clothing", "furniture"] },
    product_shop: { type: Schema.Types.ObjectId, required: true, ref: "shop" },
    product_attribute_id: { type: Schema.Types.ObjectId, required: true, refPath: "product_type" },
    product_attributes: { type: Schema.Types.Mixed, required: true }
}, {
    collection: PRODUCT_COLLECTION_NAME,
    timestamps: true
});

// define clothings schema
const CLOTHING_DOCUMENT_NAME = "clothing";
const CLOTHING_COLLECTION_NAME = "clothings";

const clothingSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String
}, {
    collection: CLOTHING_COLLECTION_NAME,
    timestamps: true
})

// define clothings schema
const ELECTRONIC_DOCUMENT_NAME = "electronic";
const ELECTRONIC_COLLECTION_NAME = "electronics";

const electronicSchema = new Schema({
    manufacture: { type: String, required: true },
    model: String,
    color: String
}, {
    collection: ELECTRONIC_COLLECTION_NAME,
    timestamps: true
})

module.exports = {
    product: model(PRODUCT_DOCUMENT_NAME, productSchema),
    clothing: model(CLOTHING_DOCUMENT_NAME, clothingSchema),
    electronic: model(ELECTRONIC_DOCUMENT_NAME, electronicSchema),
}

