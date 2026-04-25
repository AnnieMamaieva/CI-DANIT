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
const endpointsFiles = ["./server.js"];

await swaggerAutogen()(outputFile, endpointsFiles, doc);

export default doc;