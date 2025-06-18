const { OK } = require("../../core/success.response");
const factoryInstance = require("../../services/product/product.service")

const createProductController = async (req, res, next) => {
    const result = await factoryInstance.createProduct(req.body);
    return new OK({
        message: "Create new product successful",
        metadata: { result }
    }).send(res);
}

module.exports = createProductController;