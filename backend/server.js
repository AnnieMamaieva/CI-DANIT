import "dotenv/config";
import app from "./app.js";
import AppDataSource from "./db/data_source.js";

const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

//http://localhost:8000/api/newsposts
//http://localhost:8000
//http://localhost:8000/api-docs
