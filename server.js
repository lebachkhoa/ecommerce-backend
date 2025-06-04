const { default: mongoose } = require("mongoose");
const app = require("./src/app");
const { appConfig: { port } } = require("./src/configs/config")

const server = app.listen(port, () => {
    console.log(`Web service eCommerce start with port ${port}`);
})

process.on("SIGINT", async () => {
    await mongoose.disconnect();
    server.close(() => {
        console.log("Exit Server Express");
        process.exit(0);
    })
})