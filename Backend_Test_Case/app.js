require("dotenv").config();

const express = require("express");
const routes = require("./routes/index");
const swaggerUi = require("swagger-ui-express")
const yaml = require("yaml")
const fs = require("fs")

const openApiPath = "./doc/openapi.yaml"
const file = fs.readFileSync(openApiPath, "utf8")
const swaggerDocument = yaml.parse(file)

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api", routes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
