const fs = require("fs");
const path = require("path");

const keyDir = path.join(process.cwd(), "keys");
const privateKey = fs.readFileSync(path.join(keyDir, "private.pem"), "utf8");
const publicKey = fs.readFileSync(path.join(keyDir, "public.pem"), "utf8");

module.exports = {
    privateKey, publicKey
}