import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(express.static("./public"));

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected with id", socket.id);
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", { id: socket.id });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
