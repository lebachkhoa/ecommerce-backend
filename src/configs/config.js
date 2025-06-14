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
    },
    redisConfig: {
        host: process.env.DEV_REDIS_HOST,
        port: process.env.DEV_REDIS_PORT,
        password: process.env.DEV_REDIS_PASSWORD,
        db: process.env.DEV_REDIS_DB
    }
}

// pro
const pro = {
    appConfig: {
        port: process.env.PRO_APP_PORT
    },
    dbConfig: {
        host: process.env.PRO_DB_HOST,
        port: process.env.PRO_DB_PORT,
        name: process.env.PRO_DB_NAME
    },
    redisConfig: {
        host: process.env.PRO_REDIS_HOST,
        port: process.env.PRO_REDIS_PORT,
        password: process.env.PRO_REDIS_PASSWORD,
        db: process.env.PRO_REDIS_DB
    }
}

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];