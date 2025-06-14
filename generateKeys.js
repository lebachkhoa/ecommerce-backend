const { generateKeyPairSync } = require("crypto");
const fs = require("fs");
const path = require("path");

const generateKeyPair = () => {
    const keyDir = path.join(process.cwd(), "keys");
    const privatePath = path.join(keyDir, "private.pem");
    const publicPath = path.join(keyDir, "public.pem");
    // if 
    if (fs.existsSync(keyDir) && fs.existsSync(publicPath) && fs.existsSync(privatePath)) {
        return;
    }

    // create keys folder
    if (!fs.existsSync(keyDir)) {
        fs.mkdirSync(keyDir);
    }

    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    fs.writeFileSync(privatePath, privateKey, { encoding: "utf8", mode: 0o600 });
    fs.writeFileSync(publicPath, publicKey, { encoding: "utf8" });
}

generateKeyPair();