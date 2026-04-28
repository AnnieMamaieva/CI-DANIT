import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import newspostsRoutes from "./routes/newsposts.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "./passport.js";
import cors from "cors";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

const app = express();

app.use(cors());

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(loggerMiddleware);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", newspostsRoutes);
app.use("/auth", authRoutes);

app.use(errorHandlerMiddleware);

export default app;
