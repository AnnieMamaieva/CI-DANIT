import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import AppDataSource from "./db/data_source.js";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Frontend connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Frontend disconnected:", socket.id);
  });
})
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

//http://localhost:8000/api/newsposts
//http://localhost:8000
//http://localhost:8000/api-docs
