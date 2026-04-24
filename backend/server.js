import "dotenv/config";
import express from "express";
import newspostsRoutes from "./routes/newsposts.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "./passport.js";
import cors from "cors";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware.js";
import loggerMiddleware from "./middleware/logger.middleware.js";
import AppDataSource from "./db/data_source.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(passport.initialize());
app.use("/api", newspostsRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(errorHandlerMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on  ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

//http://localhost:8000/api/newsposts
//http://localhost:8000