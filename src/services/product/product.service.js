/**
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

const { product, clothing, electronic } = require("../../models/product.model");
const { BadRequestError } = require("../../core/error.response")

class Product {
    constructor(payload) {
        this.payload = payload;
    }

    async createProduct() {
        const newBodyProduct = await product.create(this.payload);
        if (!newBodyProduct) throw new BadRequestError("create main product error");

        return newBodyProduct;
    }
}

class Clothing extends Product {
    async createProduct() {
        // create clothing document with product_attributes
        const newClothing = await clothing.create(this.payload.product_attributes);
        if (!newClothing) throw new BadRequestError("create new clothing error");

        // detach _id, __v, createdAt, updatedAt from clother object
        this.payload.product_attribute_id = newClothing._id;
        const cloned = JSON.parse(JSON.stringify(newClothing));
        const { _id, __v, createdAt, updatedAt, ...pureAttrs } = cloned;
        this.payload.product_attributes = pureAttrs;
        /*
        const { _id, __v, createdAt, updatedAt, ...pureAttrs } = newClothing.toOject();
        this.payload.product_attributes = pureAttrs;
        */

        // create product document with payload
        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError("create new product error");

        return newProduct;
    }
}

class Electronic extends Product {
    async createProduct() {
        // create electronic document with product_attributes
        const newElectronic = await electronic.create(this.payload.product_attributes);
        if (!newElectronic) throw new BadRequestError("create new electronic error");

        // detach _id, __v, createdAt, updatedAt  from clother object
        this.payload.product_attribute_id = newElectronic._id;
        const cloned = JSON.parse(JSON.stringify(newElectronic));
        const { _id, __v, createdAt, updatedAt, ...pureAttrs } = cloned;
        this.payload.product_attributes = pureAttrs;

        // create product document with payload
        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError("create new product error");

        return newProduct;
    }
}

class Factory {
    constructor() {
        this.registry = new Map();
    }

    addNewProduct(type, ProductClass) {
        this.registry.set(type, ProductClass);
    }

    async createProduct(payload) {
        const ProductClass = this.registry.get(payload.product_type);
        if (!ProductClass) throw new BadRequestError("No product class match");

        return new ProductClass(payload).createProduct();
    }
}

const factoryInstance = new Factory();
factoryInstance.addNewProduct("clothing", Clothing);
factoryInstance.addNewProduct("electronic", Electronic);

module.exports = factoryInstance;
