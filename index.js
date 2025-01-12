const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./"));

app.get("/", (req, res) => {
    res.sendFile((__dirname + "/index.html"));
});

io.on("connection", (socket) => {
    console.log("A user connected to the server!");
    socket.on("disconnect", () => {
        console.log("The user disconnected!");
    });
});

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
    });
});

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});