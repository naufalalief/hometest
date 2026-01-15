const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

const swaggerSpec = yaml.load("./src/docs/takehometest.yaml");

module.exports = { swaggerUi, swaggerSpec };
