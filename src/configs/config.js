require("dotenv").config();

// dev
const dev = {
    appConfig: {
        port: process.env.DEV_APP_PORT
    },
    dbConfig: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME
    }
}

const pro = {
    appConfig: {
        port: process.env.PRO_APP_PORT
    },
    dbConfig: {
        host: process.env.PRO_DB_HOST,
        port: process.env.PRO_DB_PORT,
        name: process.env.PRO_DB_NAME
    }
}

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];