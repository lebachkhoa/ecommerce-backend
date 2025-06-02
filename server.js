const app = require("./src/app");

const PORT = 3000;

const server = app.listen(3000, () => {
    console.log(`Web service eCommerce start with port ${PORT}`);
})

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Exit Server Express");
    })
})