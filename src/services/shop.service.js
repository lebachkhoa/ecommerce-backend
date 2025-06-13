const shopModel = require("../models/shop.model");

const createShop = async ({ name, email, password, role = "SHOP" }) => {
    return await shopModel.create({
        name,
        email,
        password,
        role: [role]
    });
}

const findByEmail = async ({ email }) => {
    return await shopModel.findOne({ email }).lean();
}

module.exports = {
    createShop,
    findByEmail
}