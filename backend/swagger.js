import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My API",
    description: "docs for news service",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./routes/auth.routes.js",
  "./routes/newsposts.routes.js",
];

await swaggerAutogen()(outputFile, endpointsFiles, doc);

export default doc;